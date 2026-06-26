import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export interface Props {
  id?: number | string;
  item?: any;
  onClick?: () => void;
}

export default function BtnExpediente({ 
  item, 
}: Readonly<Props>) {  

  const navigate = useNavigate();
  const { id  , claveExpediente } = item;

  const handleClick = () => { 
     navigate(`/expedientes/ver/${id}`);  
  };

  return (
    <Button
      id={`clave_${id}`}
      type={"link"} 
      className="font-semibold p-1"
      role="a"
      aria-label={`Ver Expediente ${item.claveExpediente}`}
      onClick={handleClick} 
    >
      {claveExpediente}
    </Button>
  );
}
