import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/axiosInstance";
import { Select } from "antd";
import { DefaultOptionType, SelectProps } from "antd/es/select";

export default function FueroComboBox(props: Readonly<SelectProps>) {
   const { data } = useQuery({
    queryKey: ["fueros"],
    queryFn: () => request("/api/configuracion/fueros"),
  });

  const options: DefaultOptionType[] =
    data?.map((item: FueroDTO) => {
      return {
        value:  item.idFuero,
        label: item.codigo + " - " + item.descripcion.toUpperCase(),
      };
    }) ?? [];

  return (
    <div className="flex gap-2">
      <Select
        options={options}
        showSearch
        allowClear
        placeholder="Seleccione un departamento"
       // value={props.value}
        {...props}
      />
    </div>
  );
}
