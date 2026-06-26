import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
} from "antd";

interface Props {
  input?: InputPersona;
  onClose: () => void;
  afterCrud: () => void; 
  idExpediente: number;
}

export default function PersonaExpedienteForm({
  input,
  onClose,
  afterCrud,
  idExpediente
}: Readonly<Props>) {  
  const [upsertPersona] = useQuery<number>((inputPersona: any) =>
    request("/api/persona/save", inputPersona)
  );

  const onFinish: FormProps<InputPersona>["onFinish"] = async (
    values
  ) => { 
    values.id = input?.idPersona ?? 0;
    values.idExpediente = idExpediente;
    await upsertPersona(values);
    message.success(
      `Persona ${values.id ? "actualizada" : "creada"} exitosamente.`
    );
    afterCrud();
    onClose();
  };
 

  return (
    <Form
      name="editarTitular"
      onFinish={onFinish} 
      layout={"vertical"}
      scrollToFirstError={true}
      initialValues={input ?? {}}
    >
      <Form.Item<InputPersona>
        label="Nombres"
        name="nombres"
        rules={[
          {
            required: true,
            message: "Por favor ingrese sus nombres",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<InputPersona>
        label="Apellidos"
        name="apellidos"
        rules={[
          {
            required: true,
            message: "Por favor ingrese sus apellidos",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<InputPersona>
        name="cuit"
        label="CUIT/CUIL"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su CUIT/CUIL",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputPersona> label="Nro. Documento" name="nroDoc">
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputPersona> label="Email" name="email">
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputPersona> label="Teléfono" name="telefono">
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputPersona> label="Dirección" name="direccion">
        <Input allowClear />
      </Form.Item>
      {/*} <Form.Item<InputPersona>
        label="Fecha Nacimiento"
        name="fechaNacimiento"
      >
        <DatePicker allowClear />
      </Form.Item>*/}
      <Form.Item<InputPersona>
        label="Porcentaje Titularidad"
        name="porcentajeTitularidad"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su porcentaje titularidad",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
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
