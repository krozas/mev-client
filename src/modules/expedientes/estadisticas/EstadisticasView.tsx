import { useEffect } from "react";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { Bar } from "@ant-design/plots"; // Nota: 'Bar' es horizontal. Si preferís vertical, usá 'Column'.

export default function EstadisticasView() {
  const [getDatosAnioFuero, { data: infoEstadisticas }] = useQuery<any>(() =>
    request(`/api/expediente/estadisticas`),
  );

  useEffect(() => {
    getDatosAnioFuero();
  }, []);

  const dataProcesada = infoEstadisticas?.map((item: any) => ({
    ...item,
    ejeX: `${item.year} - ${item.codigoCiudad}`,
  }));

  const config = {
    data: dataProcesada,
    xField: "ejeX",
    yField: "count",
    colorField: "codigoFuero",
    group: true,
  };

  return (
    <>
      <h3>Estadísticas por Año, Ciudad y Fuero</h3>
      <div style={{ height: 500 }}>
        <Bar {...config} />
      </div>
    </>
  );
}
