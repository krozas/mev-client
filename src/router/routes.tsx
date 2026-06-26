import MainLayout from "@components/layout/MainLayout";
import { configuracionRoutes } from "@modules/configuracion/routes";
import { expedientesRoutes } from "@modules/expedientes/routes";
import { lazy } from "react";

const Index = lazy(() => import("@pages/Index"));
 

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      configuracionRoutes,
      expedientesRoutes],
  },
];

export { routes };