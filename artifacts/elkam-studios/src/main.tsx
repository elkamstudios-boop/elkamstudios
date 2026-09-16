import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

// On Replit, the platform router merges this frontend and the API onto one
// origin, so relative fetch("/api/...") calls just work. Hosts that serve
// the frontend and API from separate origins (e.g. a static site + a
// separate web service) need the API's absolute URL instead.
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
if (apiBaseUrl) setBaseUrl(apiBaseUrl);

createRoot(document.getElementById("root")!).render(<App />);
