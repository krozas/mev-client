import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import config from "@config/config";

const router = createBrowserRouter(routes, { basename: config.baseUrl }); 
export default router;
