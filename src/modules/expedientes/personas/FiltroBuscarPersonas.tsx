import { Button, Form, Input } from "antd";
import { FormProps, useWatch } from "antd/es/form/Form";


type FiltrosBuscarViewProps = {
  loading: boolean;
  onBuscar: (data: FiltrosPersona) => void;
};

export default function FiltroBuscarPersonas({  
  onBuscar,
}: Readonly<FiltrosBuscarViewProps>) {


  const [form] = Form.useForm();
  const cuit = useWatch( "cuit" ,form);
  const apellidos = useWatch( "apellidos" ,form);
  const nombres = useWatch( "nombres" ,form);


  const onFinish: FormProps<FiltrosPersona>['onFinish'] = (values) => { 
    onBuscar(values);
  };
 
  return (
    <Form
      name="formBuscarPersonas"
      className="!flex-row items-baseline flex-wrap !gap-y-2"
      onFinish={onFinish}
      form={form} 
      autoComplete="off"
    >
      <Form.Item<FiltrosPersona>
        label="Nombre"
        name="nombres"

      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<FiltrosPersona>
        label="Apellido"
        name="apellidos"
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<FiltrosPersona> name="cuit" label="CUIT">
        <Input allowClear />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" disabled={!cuit && !apellidos && !nombres}>
          Buscar
        </Button>
      </Form.Item>
    </Form>
  );
}
