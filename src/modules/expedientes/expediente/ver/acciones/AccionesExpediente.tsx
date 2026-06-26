import { Button, Dropdown, MenuProps } from "antd";
import { EditOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import PersonasExpediente from "../PersonasExpediente";
import ButtonDrawer from "@components/button/ButtonDrawer";
import EditarExpediente from "./EditarExpediente";
interface Props {
  expediente: any;
  afterCrud: () => void;
}

export default function AccionesExpediente({
  expediente,
  afterCrud,
}: Readonly<Props>) {
  const items: MenuProps["items"] = [
    {
      key: "editarExpediente",
      label: (
        <ButtonDrawer
          title="Editar Expediente"
          icon={<EditOutlined />}
          contentRenderer={({ onClose }) => (
            <EditarExpediente
              onClose={onClose}
              input={expediente}
              afterCrud={afterCrud}
            />
          )}
        />
      ),
    },

    {
      key: "verPersonas",
      label: (
        <ButtonDrawer
          title="Personas"
          icon=<EyeOutlined />
          contentRenderer={({ onClose }) => (
            <PersonasExpediente
              idExpediente={expediente.id}
              visible={false}
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
