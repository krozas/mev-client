import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { useQuery } from "@hooks/useQuery";
import { Button, Table } from "antd/lib";
import { request } from "@utils/axiosInstance";
import AccionesCiudad from "./acciones/AccionesCiudad";
import CiudadForm from "./acciones/CiudadForm";
import { PlusOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";

function renderAcciones(item: any, afterCrud: () => void) {
  return (
    <div className="flex justify-center gap-3 items-center">
      <AccionesCiudad item={item} afterCrud={afterCrud} />
    </div>
  );
}

const getColumns = (afterCrud: () => void): ColumnsType<CiudadDTO> => {
  return [
    {
      key: "codigo",
      title: "Código",
      dataIndex: "codigo",
      width: "100px",
    },
    {
      key: "descripcion",
      title: "Descripción",
      dataIndex: "descripcion",
      align: "center",
      width: "250px",
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

export default function CiudadesView() {
  const [getCiudades, {data }] = useQuery(() =>
    request(`/api/configuracion/ciudades`)
  );

  useEffect(() => {
    getCiudades();
  }, []);

  const columns = useMemo(() => getColumns(getCiudades), [getCiudades]);

  return (
    <>
      <h3>Ciudades</h3>
      <div className="flex justify-end mr-2">
        <Button icon=<PlusOutlined /> type="primary">
          <ButtonDrawer
            title="Crear Ciudad"
            contentRenderer={({ onClose }) => (
              <CiudadForm onClose={onClose} afterCrud={getCiudades} />
            )}
          />
        </Button>
      </div>
      <Table<CiudadDTO> columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}
