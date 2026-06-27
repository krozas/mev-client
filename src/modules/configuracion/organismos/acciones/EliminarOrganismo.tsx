import {  DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { message, Modal } from "antd";

declare interface Props {
  idOrganismo: number;
  afterCrud: () => void;
}

const showPromiseConfirm = (onConfirm: () => Promise<void>) => {
  Modal.confirm({
    title: "Elimnar Organismo",
    content:
      "¿Está seguro que desea eliminar el departamento?",
    onOk: onConfirm,
    okCancel: true,
  });
};
export default function EliminarOrganismo({
  idOrganismo,
  afterCrud,
}: Readonly<Props>) {
    const [eliminar] = useQuery<number>((idOrganismo: number) =>
      request("/api/configuracion/organismos/delete", { id: idOrganismo })
    );
    const handleEliminar = async () => {
      try {
        await eliminar(idOrganismo);
        message.success(
          `Organismo eliminado exitosamente.`
        );
        afterCrud();
      } catch (e: any) {
        message.error(
          e.message ??
            "Ocurrió un error al eliminar al eliminar el departamento. Intente nuevamente o comuníquese con soporte."
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
      <span>Eliminar Organismo</span>
    </button>
  );
}
