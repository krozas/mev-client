import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";
import { Button, Dropdown, MenuProps } from "antd"; 
import { Suspense } from "react";
import EliminarFuero from "./EliminarFuero.";
import FueroForm from "./Fuero.Form";

export interface Props {
  afterCrud: () => void;
  item?: any;
}

export default function AccionesFuero({ afterCrud, item }: Readonly<Props>) { 

  const items: MenuProps["items"] = [
    {
      key: "editarFuero",
      label: (
        <ButtonDrawer
          title="Editar Fuero"
          icon={<EditOutlined />}
          contentRenderer={({ onClose }) => (
            <FueroForm onClose={onClose} afterCrud={afterCrud} input={item} />
          )}
        />
      ),
    },
    {
      key: "eliminarFuero",
      label: (
        <Suspense fallback={<div>Loading...</div>}>
          <EliminarFuero idFuero={item.id} afterCrud={afterCrud} />
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
