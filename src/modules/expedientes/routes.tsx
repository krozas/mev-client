import { BarChartOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { lazy, Suspense } from "react";  
import VerExpedienteContainer from "./expediente/ver/ExpedienteContainer"; 
import ExpedientesView from "./expediente/ExpedienteView";


const PersonasView = lazy(() =>
  import("@modules/expedientes/personas/PersonasView")
);

const EstadisticasView = lazy(() =>
  import("@modules/expedientes/estadisticas/EstadisticasView")
);
const expedientesRoutes = {
  path: "expedientes",
  children: [ 
  { path: "Expedientes", element: <ExpedientesView /> , icon :  <HomeOutlined />}, 
   {
      path: "ver/:idExpediente",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <VerExpedienteContainer />
        </Suspense>
      ),
    },
    { path: "Personas", element: <PersonasView /> , icon :  <UserOutlined />},
    { path: "Estadísticas", element: <EstadisticasView /> , icon :  <BarChartOutlined />},
  ],
};

export { expedientesRoutes };
