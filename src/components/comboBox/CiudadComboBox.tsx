import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/axiosInstance";
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

export default function CiudadComboBox(props: Readonly<SelectProps>) {
  const { data } = useQuery({
    queryKey: ["ciudades"],
    queryFn: () => request("/api/configuracion/ciudades"),
  });

  const options: DefaultOptionType[] =
    data?.map((item: CiudadDTO) => {
      return {
        value: item.id,
        label: item.codigo + " - " + item.descripcion,
      };
    }) ?? []; 
  
  return (
    <div className="flex gap-2">
      <Select
        options={options}
        showSearch
        allowClear
        placeholder="Seleccione una ciudad" 
        {...props}
      />
    </div>
  );
}
