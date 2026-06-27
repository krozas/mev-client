import CiudadComboBox from "@components/comboBox/CiudadComboBox";
import FueroComboBox from "@components/comboBox/FueroComboBox";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { Button, Flex, Form, FormProps, Input, message } from "antd";

interface Props {
  input?: InputOrganismo;
  onClose: () => void;
  afterCrud: () => void;
}

export default function OrganismoForm({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [upsertOrganismo] = useQuery<number>((inputOrganismo: any) =>
    request("/api/configuracion/organismos/save", inputOrganismo),
  );

  const onFinish: FormProps<InputOrganismo>["onFinish"] = async (values) => {
    values.id = input?.id ?? 0;
    await upsertOrganismo(values);
    message.success(
      `Organismo ${values.id ? "actualizado" : "creado"} exitosamente.`,
    );
    afterCrud();
    onClose();
  };

  return (
    <Form
      name="editarOrganismo"
      onFinish={onFinish}
      layout={"vertical"}
      scrollToFirstError={true}
      initialValues={input ?? {}}
    >

      <Form.Item<InputOrganismo>
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el nombre",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>
     <Form.Item<InputOrganismo>
        label="Caratula"
        name="caratula"
       
      >
        <Input allowClear />
      </Form.Item>
     
      <Form.Item<InputOrganismo> label="Ciudad" name="idCiudad" required>
        <CiudadComboBox style={{ width: "100%" }} />
      </Form.Item>
       <Form.Item<InputOrganismo> name="idFuero" label="Fuero" required>
        <FueroComboBox style={{ width: "100%" }} />
      </Form.Item>
      <Flex gap="middle" justify="flex-end">
        <Button onClick={() => onClose()} danger>
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Flex>
    </Form>
  );
}
