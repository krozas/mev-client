import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { Button, Flex, Form, FormProps, Input, message } from "antd";

interface Props {
  input?: InputFuero;
  onClose: () => void;
  afterCrud: () => void;
}

export default function FueroForm({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [upsertFuero] = useQuery<number>((inputFuero: any) =>
    request("/api/configuracion/fueros/save", inputFuero)
  );

  const onFinish: FormProps<InputFuero>["onFinish"] = async (values) => {
    values.id = input?.id ?? 0;
    await upsertFuero(values);
    message.success(
      `Fuero ${values.id ? "actualizado" : "creado"} exitosamente.`
    );
    afterCrud();
    onClose();
  };

  return (
    <Form
      name="editarFuero"
      onFinish={onFinish}
      layout={"vertical"}
      scrollToFirstError={true}
      initialValues={input ?? {}}
    >
      <Form.Item<InputFuero>
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

      <Form.Item<InputFuero>
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
