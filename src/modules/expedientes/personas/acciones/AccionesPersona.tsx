import { Button, Dropdown, MenuProps } from "antd";
import { EditOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";  
import ButtonDrawer from "@components/button/ButtonDrawer"; 
import PersonaForm from "./EditarPersona";
import ExpedientePersonas from "./ExpedientePersonas";

interface Props {
  persona: PersonaDTO;
  afterCrud: () => void;
}

export default function AccionesPersona({
  persona,
  afterCrud,
}: Readonly<Props>) { 
  const items: MenuProps["items"] = [
    {
      key: "editarPersona",
      label: (
        <ButtonDrawer
          title="Editar Persona"
          icon={<EditOutlined />}
          contentRenderer={({ onClose }) => (
            <PersonaForm
              onClose={onClose}
              input={persona}
              afterCrud={afterCrud}
            />
          )}
        />
      ),
    },
    {
      key: "verExpedientes",
      label: (
        <ButtonDrawer
          title="Ver Expedientes"
          icon={<EyeOutlined />}
          contentRenderer={({ onClose }) => (
            <ExpedientePersonas
              idPersona={persona.id}
              onClose={onClose}
            />
          )}
        />
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button icon={<MoreOutlined size={50} aria-hidden="true" />} />
    </Dropdown>
  );
}
