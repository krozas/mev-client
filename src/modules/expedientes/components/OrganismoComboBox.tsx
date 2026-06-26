import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/axiosInstance";
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

export default function OrganismoComboBox(props: Readonly<SelectProps>) {
  const { data } = useQuery({
    queryKey: ["organismoes"],
    queryFn: () => request("/api/configuracion/organismos"),
  });

  const options: DefaultOptionType[] =
    data?.map((item: OrganismoDTO) => {
      return {
        value: item.id,
        label: item.codigo  ,
      };
    }) ?? []; 
  
  return (
    <div className="flex gap-2">
      <Select
        options={options}
        showSearch
        allowClear
        placeholder="Seleccione una organismo" 
        {...props}
      />
    </div>
  );
}
