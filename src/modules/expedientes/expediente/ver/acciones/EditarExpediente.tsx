import { useEffect, useState } from "react";
import CiudadComboBox from "@components/comboBox/CiudadComboBox";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import {
  Button,
  Flex,
  Form,
  Input,
  message,
  Select,
  Spin,
  Space,
  Card,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import OrganismoComboBox from "@modules/expedientes/components/OrganismoComboBox";
import TipoVinculoComboBox from "@modules/expedientes/components/TipoVinculoComboBox";

interface Props {
  input?: any;
  onClose: () => void;
  afterCrud: () => void;
}

export default function EditarExpediente({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [form] = Form.useForm();

  const [personasOptions, setPersonasOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [loadingPersonas, setLoadingPersonas] = useState(false);
  const [upsertExpediente] = useQuery<number>((inputExpediente: any) =>
    request("/api/expediente/save", inputExpediente),
  ); 
  const buscarPersonas = async (search: any = {}) => {
    setLoadingPersonas(true);
    try {
      const res = await request(`/api/persona`, search);
      if (Array.isArray(res)) {
        setPersonasOptions(
          res.map((p: any) => ({
            value: p.id,
            label: `${p.apellidos}, ${p.nombres} (CUIT: ${p.cuit ?? "Sin CUIT"})`,
          })),
        );
      }
      const personasExpe = await request(`/api/expediente/personas`, {
        idExpediente: input?.id,
      });
      console.log("🚀 ~ buscarPersonas ~ personasExpe:", personasExpe)
       if (personasExpe) {
        form.setFieldValue("personas", 
          personasExpe.map((p: any) => ({
            idPersona: p.idPersona,
            idVinculo: p.idVinculo,
            idExpediente: p.idExpediente,
            id: p.id,
          }))
        );
      }
    } catch (error) {
      console.error("Error cargando personas", error);
    } finally {
      setLoadingPersonas(false);
    }
  };

  useEffect(() => {
    buscarPersonas({});
  }, []);

  const onFinish = async (values: any) => {
    values.id = input?.id ?? 0;
    await upsertExpediente(values);
    message.success(
      `Expediente ${values.id ? "actualizado" : "creado"} exitosamente.`,
    );
    afterCrud();
    onClose();
  };

  return (
    <Form
      name="editarExpediente"
      layout={"vertical"}
      onFinish={onFinish}
      scrollToFirstError={true}
      form={form}
      initialValues={input ?? {}}
    >
      <Form.Item
        name="caratula"
        label="Carátula"
        rules={[{ required: true, message: "Por favor ingrese la carátula" }]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item name="idOrganismo" label="Organismo">
        <OrganismoComboBox style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Tipo" name="tipo">
        <Select
          options={[
            { value: "EXD", label: "EXD" },
            { value: "EXP", label: "EXP" },
          ]}
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Seleccione un tipo"
        />
      </Form.Item>

      <Form.Item name="numero" label="Número">
        <Input allowClear />
      </Form.Item>

      <Form.Item name="anio" label="Año">
        <Input allowClear />
      </Form.Item>

      <Form.Item label="Ciudad" name="idCiudad">
        <CiudadComboBox style={{ width: "100%" }} />
      </Form.Item>
      <Card
        title="Personas Vinculadas al Expediente"
        size="small"
        style={{ marginBottom: 20 }}
      >
        <Form.List name="personas">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "idPersona"]}
                    rules={[
                      { required: true, message: "Seleccione la persona" },
                    ]}
                    style={{ width: 300, marginBottom: 0 }}
                  >
                    <Select
                      showSearch
                      placeholder="Buscar persona..."
                      filterOption={false}
                      onSearch={(val) => buscarPersonas(val)}
                      notFoundContent={
                        loadingPersonas ? (
                          <Spin size="small" />
                        ) : (
                          "No se hallaron resultados"
                        )
                      }
                      options={personasOptions}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "idVinculo"]}
                    rules={[
                      { required: true, message: "Seleccione el vínculo" },
                    ]}
                    style={{ width: 180, marginBottom: 0 }}
                  >
                    <TipoVinculoComboBox />
                  </Form.Item>

                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}

              <Form.Item style={{ marginTop: 10, marginBottom: 0 }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Asociar Persona y Vínculo
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>

      <Flex gap="middle" justify="flex-end" style={{ marginTop: 24 }}>
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
