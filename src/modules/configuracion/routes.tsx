import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import { lazy } from "react"; 
import CiudadesView from "./ciudades/CiudadesView";
import OrganismosView from "./organismos/OrganismosView";
const FuerosView = lazy(() =>
  import("@modules/configuracion/fueros/FuerosView")
);


const configuracionRoutes = {
  path: "configuracion",
  children: [ 
  { path: "Fueros", element: <FuerosView /> , icon :  <EnvironmentOutlined/>},
  { path: "Ciudades", element: <CiudadesView/> , icon: <GlobalOutlined/> },    
  { path: "Organismos", element: <OrganismosView/> , icon: <GlobalOutlined/> },
  ],
};

export { configuracionRoutes };
