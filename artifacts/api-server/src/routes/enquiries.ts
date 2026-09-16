import { Router, type IRouter, type Request, type Response } from "express";
import { db, enquiriesTable } from "@workspace/db";
import { SubmitEnquiryBody } from "@workspace/api-zod";
import { appendEnquiryToSheet } from "../lib/google-sheets";
import ExcelJS from "exceljs";

const router: IRouter = Router();

router.post("/enquiries", async (req: Request, res: Response) => {
  const parsed = SubmitEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { fullName, phone, email, company, designation } = parsed.data;

  const [enquiry] = await db
    .insert(enquiriesTable)
    .values({ fullName, phone, email, company: company ?? null, designation: designation ?? null })
    .returning();

  appendEnquiryToSheet({
    fullName: enquiry.fullName,
    phone: enquiry.phone,
    email: enquiry.email,
    company: enquiry.company,
    designation: enquiry.designation,
    createdAt: enquiry.createdAt,
  }).catch(() => {});

  res.status(201).json({
    id: enquiry.id,
    fullName: enquiry.fullName,
    phone: enquiry.phone,
    email: enquiry.email,
    company: enquiry.company,
    designation: enquiry.designation,
    createdAt: enquiry.createdAt.toISOString(),
  });
});

router.get("/admin/enquiries/export", async (req: Request, res: Response) => {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken || req.headers["x-admin-token"] !== adminToken) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const rows = await db.select().from(enquiriesTable).orderBy(enquiriesTable.createdAt);

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Enquiries");

  ws.columns = [
    { header: "ID", key: "id", width: 8 },
    { header: "Full Name", key: "fullName", width: 24 },
    { header: "Phone", key: "phone", width: 18 },
    { header: "Email", key: "email", width: 30 },
    { header: "Company", key: "company", width: 24 },
    { header: "Designation", key: "designation", width: 20 },
    { header: "Submitted At", key: "createdAt", width: 22 },
  ];

  for (const row of rows) {
    ws.addRow({
      id: row.id,
      fullName: row.fullName,
      phone: row.phone,
      email: row.email,
      company: row.company ?? "",
      designation: row.designation ?? "",
      createdAt: row.createdAt.toISOString(),
    });
  }

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=enquiries.xlsx");

  await wb.xlsx.write(res);
  res.end();
});

export default router;
