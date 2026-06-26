import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { message, Modal } from "antd";

declare interface Props {
  idPersona: number;
  afterCrud: () => void;
}

const showPromiseConfirm = (onConfirm: () => Promise<void>) => {
  Modal.confirm({
    title: "Elimnar Persona",
    content:
      "¿Está seguro que desea eliminar la persona como titular del inmueble?",
    onOk: onConfirm,
    okCancel: true,
  });
};
export default function EliminarPersona({
  idPersona,
  afterCrud,
}: Readonly<Props>) {
    const [eliminar] = useQuery<number>((idPersona: number) =>
      request("/api/persona/delete", { id: idPersona })
    );
    const handleEliminar = async () => {
      try {
        await eliminar(idPersona);
        message.success(
          `Persona eliminada exitosamente.`
        );
        afterCrud();
      } catch (e: any) {
        message.error(
          e.message ??
            "Ocurrió un error al eliminar al registrar la persona. Intente nuevamente o comuníquese con soporte."
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
      <span>Eliminar Persona</span>
    </button>
  );
}
