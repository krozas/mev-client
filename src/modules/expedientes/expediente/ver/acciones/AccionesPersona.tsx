import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";
import { Button, Dropdown, MenuProps } from "antd";
import PersonaTitularForm from "./PersonaExpedienteForm";
import { Suspense } from "react";
import EliminarPersona from "./EliminarPersona";

export interface Props {
  afterCrud: () => void;
  item?: any;
}

export default function AccionesPersona({ afterCrud, item }: Readonly<Props>) {
  const items: MenuProps["items"] = [
    {
      key: "editarPersona",
      label: (
        <ButtonDrawer
          title="Editar Persona"
          icon={<EditOutlined />}
          contentRenderer={({ onClose }) => (
            <PersonaTitularForm
              onClose={onClose}
              afterCrud={afterCrud}
              idExpediente={item.id}
              input={item}
            />
          )}
        />
      ),
    },
    {
      key: "eliminarPersona",
      label: (
        <Suspense fallback={<div>Loading...</div>}>
          <EliminarPersona idPersona={item.idPersona} afterCrud={afterCrud} />
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
