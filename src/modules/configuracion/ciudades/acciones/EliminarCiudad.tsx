import {  DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { message, Modal } from "antd";

declare interface Props {
  idCiudad: number;
  afterCrud: () => void;
}

const showPromiseConfirm = (onConfirm: () => Promise<void>) => {
  Modal.confirm({
    title: "Elimnar Ciudad",
    content:
      "¿Está seguro que desea eliminar la ciudad?",
    onOk: onConfirm,
    okCancel: true,
  });
};
export default function EliminarCiudad({
  idCiudad,
  afterCrud,
}: Readonly<Props>) {
    const [eliminar] = useQuery<number>((idCiudad: number) =>
      request("/api/configuracion/ciudades/delete", { id: idCiudad })
    );
    const handleEliminar = async () => {
      try {
        await eliminar(idCiudad);
        message.success(
          `Ciudad eliminada exitosamente.`
        );
        afterCrud();
      } catch (e: any) {
        message.error(
          e.message ??
            "Ocurrió un error al eliminar al  eliminar la ciudad. Intente nuevamente o comuníquese con soporte."
        );
      } 
    };

  
 

  return (
    <button
      className={"flex items-center gap-2"}
      style={{ width: "100%" }}
      onClick={() => showPromiseConfirm(handleEliminar)}
      type="button"
    >
      {<DeleteOutlined />}
      <span>Eliminar Ciudad</span>
    </button>
  );
}
