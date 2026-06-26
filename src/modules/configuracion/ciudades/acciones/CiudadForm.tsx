import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { Button, Flex, Form, FormProps, Input, message } from "antd";

interface Props {
  input?: InputCiudad;
  onClose: () => void;
  afterCrud: () => void;
}

export default function CiudadForm({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [upsertCiudad] = useQuery<number>((inputCiudad: any) =>
    request("/api/configuracion/ciudades/save", inputCiudad)
  );

  const onFinish: FormProps<InputCiudad>["onFinish"] = async (values) => {
    values.id = input?.id ?? 0;
    await upsertCiudad(values);
    message.success(
      `Ciudad ${values.id ? "actualizada" : "creada"} exitosamente.`
    );
    afterCrud();
    onClose();
  };

  return (
    <Form
      name="editarCiudad"
      onFinish={onFinish}
      layout={"vertical"}
      scrollToFirstError={true}
      initialValues={input ?? {}}
    >
      <Form.Item<InputCiudad>
        label="Código"
        name="codigo"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el codigo",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<InputCiudad>
        label="Descripción"
        name="descripcion"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la descripcion",
          },
        ]}
      >
        <Input allowClear />
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
