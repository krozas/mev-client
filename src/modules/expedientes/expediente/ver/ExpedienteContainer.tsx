import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import ExpedienteViewForm from "./ExpedienteViewForm";
import { request } from "@utils/axiosInstance";

export default function VerExpedienteContainer() {
  const { idExpediente } = useParams();
  console.log("🚀 ~ VerExpedienteContainer ~ idExpediente:", idExpediente)
  const [expediente, setExpediente] = useState<ExpedienteDTO>();

  const handleBuscarExpediente = async () => {
    if (Number(idExpediente)) {
      const data = await request("/api/inmueble", {
        id: idExpediente,
      });
      if (data) {
        setExpediente(data[0]);
      } 
    }
  };

  useEffect(() => {
    if (idExpediente) handleBuscarExpediente();
  }, [idExpediente]);

  return (
    <ExpedienteViewForm expediente={expediente!} afterAccion={handleBuscarExpediente} />
  );
}
