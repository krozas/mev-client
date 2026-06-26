import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@hooks/useQuery";
import { Table } from "antd/lib";
import { request } from "@utils/axiosInstance";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";
import BtnExpediente from "../components/BtnExpediente";
import EditarExpediente from "./ver/acciones/EditarExpediente";
import AccionesExpediente from "./ver/acciones/AccionesExpediente";
import FiltroBuscarExpedientes from "./FiltroBuscarExpediente";

function renderAcciones(item: any, afterCrud: () => void) {
  return (
    <div className="flex justify-center gap-3 items-center">
      <AccionesExpediente expediente={item} afterCrud={afterCrud} />
    </div>
  );
}
const getColumns = (afterCrud: () => void): ColumnsType<ExpedienteDTO> => {
  return [
    {
      key: "claveExpediente",
      title: "Expediente",
      dataIndex: "claveExpediente",
      width: "400px",
      sorter: (a, b) => a.numero-b.numero ,//.localeCompare(b.claveExpediente),
      render: (_, item) => {
        return <BtnExpediente item={item} />;
      },
    },
    {
      key: "caratula",
      title: "Caratula",
      dataIndex: "caratula",
      align: "center",
      width: "300px",

      sorter: (a, b) => a.caratula.localeCompare(b.caratula),
    },
    {
      key: "acciones",
      title: "Acciones",
      align: "center",
      fixed: "right",
      width: "150px",
      render: (_, item) => renderAcciones(item, afterCrud),
    },
  ];
};

export default function ExpedientesView() {
  const [filtros, setFiltros] = useState<FiltrosExpediente>();
  const [getExpedientes, { loading, data }] = useQuery(
    (filtros: FiltrosExpediente) => request(`/api/expediente`, filtros),
  );

  useEffect(() => {
    if (filtros) {
      getExpedientes(filtros);
    }
  }, [filtros]);

  const handleBuscarExpedientes = async () => {
    if (filtros) getExpedientes(filtros);
  };

  const columns = useMemo(
    () => getColumns(handleBuscarExpedientes),
    [getExpedientes],
  );

  return (
    <>
      <h3>Expedientes</h3>
      <div
        id="headerControlesExpediente"
        className="horizontal-layout items-end justify-between flex-wrap gap-3"
      >
        <FiltroBuscarExpedientes loading={loading} onBuscar={setFiltros} />
        <Button icon=<PlusOutlined /> type="primary">
          <ButtonDrawer
            title="Crear Expediente"
            contentRenderer={({ onClose }) => (
              <EditarExpediente
                onClose={onClose}
                afterCrud={handleBuscarExpedientes}
              />
            )}
          />
        </Button>
      </div>
      <Table<ExpedienteDTO>
        columns={columns}
        dataSource={data}
        rowKey="id"
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
}
