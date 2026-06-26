import { Button, Form, Input } from "antd";
import { FormProps, useWatch } from "antd/es/form/Form";
import OrganismoComboBox from "../components/OrganismoComboBox";

type FiltrosBuscarViewProps = {
  loading: boolean;
  onBuscar: (data: FiltrosExpediente) => void;
};

export default function FiltroBuscarExpedientes({
  onBuscar,
}: Readonly<FiltrosBuscarViewProps>) {
  const onFinish: FormProps<FiltrosExpediente>["onFinish"] = (values) => {
    onBuscar(values);
  };

  const [form] = Form.useForm();
  const idOrganismo = useWatch("idOrganismo", form);
  const numero = useWatch("numero", form);
  const anio = useWatch("anio", form);
  const caratula = useWatch("caratula", form);  
  return (
    <Form
      name="formBuscarExpedientes"
      form={form}
      className="!flex-row items-baseline flex-wrap !gap-y-2"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<InputExpediente> name="idOrganismo" label="Organismo">
        <OrganismoComboBox style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item<FiltrosExpediente> label="Numero" name="numero">
        <Input allowClear style={{ width: "300" }} />
      </Form.Item>
      <Form.Item<FiltrosExpediente> label="Año" name="anio">
        <Input allowClear style={{ width: "300" }} />
      </Form.Item>
      <Form.Item<FiltrosExpediente> label="Caratula" name="caratula">
        <Input allowClear style={{ width: "300" }} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!idOrganismo && !numero && !anio && !caratula}
        >
          Buscar
        </Button>
      </Form.Item>
    </Form>
  );
}
