import { ReactElement, useState } from "react";
import MevDrawer from "@components/form/Drawer";

export interface ButtonDrawerProps {
  contentRenderer: (props: { onClose: () => void }) => ReactElement;
  title: string;
  icon?: ReactElement;
}

export default function ButtonDrawer({
  contentRenderer,
  title,
  icon,
}: Readonly<ButtonDrawerProps>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenedDrawer = (opened: boolean) => {
    setOpenDrawer(opened);
  };

  const handleCloseDrawer = () => {
    handleOpenedDrawer(false);
  };
  let button = (
    <button
      className={"flex items-center gap-2"}
      style={{ width: "100%" }}
      onClick={() => handleOpenedDrawer(true)}
      type="button"
    >
      {icon}
      <span>{title}</span>
    </button>
  );

  return (
    <>
      {button}
      <MevDrawer
        title={title}
        opened={openDrawer}
        onClose={() => handleCloseDrawer()}
        contentRenderer={contentRenderer}
      />
    </>
  );
}
