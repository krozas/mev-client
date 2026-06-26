import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { useQuery } from "@hooks/useQuery";
import { Button, Table } from "antd/lib";
import { request } from "@utils/axiosInstance"; 
import { PlusOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer"; 
import AccionesOrganismo from "./acciones/AccionesOrganismo";
import OrganismoForm from "./acciones/OrganismoForm";

function renderAcciones(item: any, afterCrud: () => void) {
  return (
    <div className="flex justify-center gap-3 items-center">
      <AccionesOrganismo item={item} afterCrud={afterCrud} />
    </div>
  );
}

const getColumns = (afterCrud: () => void): ColumnsType<OrganismoDTO> => {
  return [
    {
      key: "codigo",
      title: "Código",
      dataIndex: "codigo",
      width: "100px",
    },
    {
      key: "nombre",
      title: "Nombre",
      dataIndex: "nombre",
      align: "center",
      width: "250px",
    },
    {
      key: "caratula",
      title: "Carátula",
      dataIndex: "caratula",
      align: "center",
      width: "250px",
    },
    {
      key: "ciudad",
      title: "Ciudad",
      dataIndex: "ciudad",
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

export default function OrganismosView() {
  const [getOrganismos, { data }] = useQuery(() =>
    request(`/api/configuracion/organismos`)
  );

  useEffect(() => {
    getOrganismos();
  }, []);

  const columns = useMemo(
    () => getColumns(getOrganismos),
    [getOrganismos]
  );

  return (
    <>
      <h3>Organismos</h3>
      <div className="flex justify-end mr-2">
        <Button icon=<PlusOutlined /> type="primary">
          <ButtonDrawer
            title="Crear Organismo"
            contentRenderer={({ onClose }) => (
              <OrganismoForm
                onClose={onClose}
                afterCrud={getOrganismos}
              />
            )}
          />
        </Button>
      </div>
      <Table<OrganismoDTO> columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}
