import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { useQuery } from "@hooks/useQuery";
import { Button, Table } from "antd/lib";
import { request } from "@utils/axiosInstance";
import AccionesFuero from "./acciones/AccionesFuero";
import { PlusOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";
import FueroForm from "./acciones/Fuero.Form";

function renderAcciones(item: any, afterCrud: () => void) {
  return (
    <div className="flex justify-center gap-3 items-center">
      <AccionesFuero item={item} afterCrud={afterCrud} />
    </div>
  );
}

const getColumns = (afterCrud: () => void): ColumnsType<FueroDTO> => {
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

export default function FuerosView() {
  const [getFueros, { data }] = useQuery(() =>
    request(`/api/configuracion/fueros`)
  );

  useEffect(() => {
    getFueros();
  }, []);

  const columns = useMemo(
    () => getColumns(getFueros),
    [getFueros]
  );

  return (
    <>
      <h3>Fueros</h3>
      <div className="flex justify-end mr-2">
        <Button icon=<PlusOutlined /> type="primary">
          <ButtonDrawer
            title="Crear Fuero"
            contentRenderer={({ onClose }) => (
              <FueroForm
                onClose={onClose}
                afterCrud={getFueros}
              />
            )}
          />
        </Button>
      </div>
      <Table<FueroDTO> columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}
