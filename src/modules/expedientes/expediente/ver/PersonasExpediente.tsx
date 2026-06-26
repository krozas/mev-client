import { 
  PlusOutlined,
} from "@ant-design/icons";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { useEffect, useMemo } from "react";
import { Button, Flex } from "antd"; 
import ButtonDrawer from "@components/button/ButtonDrawer"; 
import AccionesPersona from "./acciones/AccionesPersona";
import PersonaExpedienteForm from "./acciones/PersonaExpedienteForm";

declare interface Props {
  idExpediente: number;
  visible?: boolean;
  onClose: () => void;
}

const getColumns = (afterCrud: () => void, visible: boolean) => {
  const columns: ColumnsType<any> = [
    {
      key: "nombres",
      title: "Nombres",
      dataIndex: "nombres",
      width: "100px",
    },
    {
      key: "apellidos",
      title: "Apellido",
      dataIndex: "apellidos",
      width: "100px",
    },
    {
      key: "nroDoc",
      title: "Documento",
      dataIndex: "nroDoc",
      width: "100px",
    },
    {
      key: "tipoVinculo",
      title: "Vinculo",
      dataIndex: "tipoVinculo",
      width: "100px",
    },
    {
      key: visible ? "acciones" : "",
      title: visible ? "Acciones" : "",
      render: (_, item) =>
        visible && <AccionesPersona item={item} afterCrud={afterCrud}   />,
      align: "center",
      width: visible ? "150px" : "0px",
    },
  ];
  return columns;
};

export default function PersonasExpediente({
  idExpediente,
  visible,
  onClose,
}: Readonly<Props>) { 

  const [getPersonasExpediente, { loading, data }] = useQuery(
    (filtros: FiltrosExpediente) => request(`/api/expediente/personas`, filtros)
  );

  useEffect(() => {
    if (idExpediente) getPersonasExpediente({ idExpediente: idExpediente });
  }, [idExpediente]);

  const handleBuscarExpediente = async () => {
    if (idExpediente) getPersonasExpediente({ idExpediente: idExpediente });
  };
  const columns = useMemo(
    () => getColumns(handleBuscarExpediente, visible!),
    []
  );

  return (
    <div className="vertical-layout gap-2 grow">
      {visible && (
        <div className="flex justify-end mr-3">
          <Button color="danger" variant="solid" icon={<PlusOutlined />}>
            <ButtonDrawer
              title="Nueva Persona"
              contentRenderer={({ onClose }) => (
                <PersonaExpedienteForm
                  onClose={onClose}
                  afterCrud={handleBuscarExpediente}
                  idExpediente={idExpediente}
                />
              )}
            />
          </Button>
        </div>
      )}
      <Table<any>
        columns={columns}
        dataSource={data}
        rowKey="idPersona"
        loading={loading}
      />
      {!visible && (
        <Flex gap="middle" justify="flex-end">
          <Button onClick={() => onClose()} type="primary">
            Cerrar
          </Button>
        </Flex>
      )}
    </div>
  );
}
