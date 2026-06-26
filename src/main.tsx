import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//Router 
import { RouterProvider } from "react-router-dom";
import Providers from "./Providers";
import router from "./router/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Suspense>
        <Providers>
          <RouterProvider router={router} />
        </Providers>
      </Suspense>
    </React.StrictMode>
);
