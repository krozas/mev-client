import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";
import { Button, Dropdown, MenuProps } from "antd"; 
import { Suspense } from "react"; 
import EliminarOrganismo from "./EliminarOrganismo";
import OrganismoForm from "./OrganismoForm";

export interface Props {
  afterCrud: () => void;
  item?: any;
}

export default function AccionesOrganismo({ afterCrud, item }: Readonly<Props>) { 

  const items: MenuProps["items"] = [
    {
      key: "editarOrganismo",
      label: (
        <ButtonDrawer
          title="Editar Organismo"
          icon={<EditOutlined />}
          contentRenderer={({ onClose }) => (
            <OrganismoForm onClose={onClose} afterCrud={afterCrud} input={item} />
          )}
        />
      ),
    },
    {
      key: "eliminarOrganismo",
      label: (
        <Suspense fallback={<div>Loading...</div>}>
          <EliminarOrganismo idOrganismo={item.id} afterCrud={afterCrud} />
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
