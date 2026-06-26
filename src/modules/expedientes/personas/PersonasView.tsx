import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@hooks/useQuery";
import { Table } from "antd/lib";
import FiltroBuscarPersonas from "./FiltroBuscarPersonas";
import { request } from "@utils/axiosInstance";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditarPersona from "./acciones/EditarPersona";
import AccionesPersona from "./acciones/AccionesPersona";
import ButtonDrawer from "@components/button/ButtonDrawer";
 

function renderAcciones(item: any, afterCrud: () => void) {
  return (
    <div className="flex justify-center gap-3 items-center">
      <AccionesPersona persona={item} afterCrud={afterCrud} />
    </div>
  );
}

const getColumns = (
  afterCrud: () => void
): ColumnsType<PersonaDTO> => {
  return [
    {
      key: "nombres",
      title: "Nombres",
      dataIndex: "nombres",
      width: "400px",
    },
    {
      key: "apellidos",
      title: "Apellidos",
      dataIndex: "apellidos",
      align: "center",
      width: "150px",
    },
    {
      key: "cuit",
      title: "CUIT/CUIL",
      dataIndex: "cuit",
      align: "center",
      width: "120px",
    },
    {
      key: "nroDoc",
      title: "Nro. Documento",
      dataIndex: "nroDoc",
      align: "center",
      width: "120px",
    },

    {
      key: "acciones",
      title: "Acciones",
      render: (_, item) => renderAcciones(item, afterCrud),
      align: "center",
      fixed: "right",
      width: "150px",
    },
  ];
};

export default function PersonasView() {
  const [filtros, setFiltros] = useState<FiltrosPersona>();
 
  const [getPersonas, { loading, data }] = useQuery(() => request(`/api/persona`, filtros));

  useEffect(() => {
    if (filtros) {
      getPersonas(filtros);
    }
  }, [filtros]);

  const columns = useMemo(
    () => getColumns(getPersonas),
    [getPersonas]
  );

  return (
    <>
      <h3>Personas</h3>
      <div
        id="headerControlesPersona"
        className="horizontal-layout items-end justify-between flex-wrap gap-3"
      >
        <FiltroBuscarPersonas loading={loading} onBuscar={setFiltros} />
        <Button
          icon=<PlusOutlined />
          type="primary" 
        >
          <ButtonDrawer
            title="Crear Persona"
            contentRenderer={({ onClose }) => (
              <EditarPersona onClose={onClose} afterCrud={getPersonas} />
            )}
          />
        </Button>
      </div>
      <Table<PersonaDTO>
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </>
  );
}
