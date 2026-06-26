import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { ColumnsType } from "antd/es/table";
import { Button, Flex, Table } from "antd/lib";

import { useEffect, useMemo } from "react";

declare interface Props {
  idPersona: number;
  onClose: () => void;
}

const getColumns = () => {
  const columns: ColumnsType<any> = [
    {
      key: "claveExpediente",
      title: "Expediente",
      dataIndex: "claveExpediente",
      width: "100px",
    },
    {
      key: "caratula",
      title: "Caratula",
      dataIndex: "caratula",
      width: "100px",
    },
     
  ];

  return columns;
};

export default function ExpedientePersonas({
  idPersona,
  onClose,
}: Readonly<Props>) {
  const [getExpedientes, { loading, data }] = useQuery(
    (filtros: FiltrosExpediente) => request(`/api/expediente/personas`, filtros)
  );

  useEffect(() => {
    if (idPersona) getExpedientes({ idPersona: idPersona });
  }, [idPersona]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <div className="vertical-layout gap-2 grow">
      <Table<any>
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
      />
      <Flex gap="middle" justify="flex-end">
        <Button onClick={() => onClose()} type="primary">
          Cerrar
        </Button>
      </Flex>
    </div>
  );
}
