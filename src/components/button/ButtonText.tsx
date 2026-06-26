import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { Button, ButtonProps } from "antd"; 
import React from "react";

export interface Props extends Omit<  ButtonProps, "variant" | "icon"> {
  texto?: string; 
  icon?: React.ReactElement<AntdIconProps>;
}

 
export default function ButtonText({
  texto,
  type = "primary",
  icon,   
  ...btnProps
}: Readonly<Props>) {
  
  return ( 
      <Button
        type={type}
        icon={icon} 
        {...btnProps}  
      >
        {texto}
      </Button> 
  );
}
