import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";
import { Button, Dropdown, MenuProps } from "antd";
import CiudadForm from "./CiudadForm";
import { Suspense } from "react";
import EliminarCiudad from "./EliminarCiudad";

export interface Props {
  afterCrud: () => void;
  item?: any;
}

export default function AccionesCiudad({ afterCrud, item }: Readonly<Props>) { 

  const items: MenuProps["items"] = [
    {
      key: "editarCiudad",
      label: (
        <ButtonDrawer
          title="Editar Ciudad"
          icon={<EditOutlined />}
          contentRenderer={({ onClose }) => (
            <CiudadForm onClose={onClose} afterCrud={afterCrud} input={item} />
          )}
        />
      ),
    },
    {
      key: "eliminarCiudad",
      label: (
        <Suspense fallback={<div>Loading...</div>}>
          <EliminarCiudad idCiudad={item.id} afterCrud={afterCrud} />
        </Suspense>
      ),      
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button icon={<MoreOutlined size={50} aria-hidden="true" />} />
    </Dropdown>
  );
}
