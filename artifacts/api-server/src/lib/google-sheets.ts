import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "./logger";

export interface EnquiryRow {
  fullName: string;
  phone: string;
  email: string;
  company: string | null;
  designation: string | null;
  createdAt: Date;
}

const SHEET_NAME = "ELKAM Enquiries";
const HEADER_ROW = ["Name", "Phone", "Email", "Company", "Designation", "Submitted At"];

async function getOrCreateSheet(connectors: ReplitConnectors, spreadsheetId: string): Promise<void> {
  const metaRes = await connectors.proxy(
    "google-sheet",
    `/v4/spreadsheets/${spreadsheetId}`,
    { method: "GET" },
  );
  const meta = await metaRes.json() as { sheets?: { properties?: { title?: string } }[] };

  const existing = meta.sheets?.find((s) => s.properties?.title === SHEET_NAME);
  if (!existing) {
    await connectors.proxy(
      "google-sheet",
      `/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [{ addSheet: { properties: { title: SHEET_NAME } } }],
        }),
        headers: { "Content-Type": "application/json" },
      },
    );
    await connectors.proxy(
      "google-sheet",
      `/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_NAME + "!A1")}?valueInputOption=RAW`,
      {
        method: "PUT",
        body: JSON.stringify({ values: [HEADER_ROW] }),
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function appendEnquiryToSheet(row: EnquiryRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    logger.warn("GOOGLE_SHEET_ID not set — skipping Google Sheets push");
    return;
  }

  if (!process.env.REPLIT_CONNECTORS_HOSTNAME) {
    logger.warn("Google Sheets connector not available — skipping push");
    return;
  }

  const connectors = new ReplitConnectors();

  try {
    await getOrCreateSheet(connectors, spreadsheetId);
    const range = encodeURIComponent(SHEET_NAME + "!A1");
    const res = await connectors.proxy(
      "google-sheet",
      `/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        body: JSON.stringify({
          values: [
            [
              row.fullName,
              row.phone,
              row.email,
              row.company ?? "",
              row.designation ?? "",
              row.createdAt.toISOString(),
            ],
          ],
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!res.ok) {
      const body = await res.text();
      logger.error({ status: res.status, body }, "Google Sheets append returned error");
      return;
    }

    logger.info("Appended enquiry row to Google Sheet");
  } catch (err) {
    logger.error({ err }, "Failed to append to Google Sheet — continuing anyway");
  }
}
