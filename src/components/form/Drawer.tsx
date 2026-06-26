import React, { ReactElement, Suspense } from "react";
import { Drawer } from "antd";

export interface Props {
  onClose: () => void;
  opened: boolean;
  contentRenderer: (props: { onClose: () => void }) => ReactElement;
  title: string;
}

const MevDrawer: React.FC<Props> = ({
  contentRenderer,
  title,
  opened,
  onClose,
}: Readonly<Props>) => {
   
  return (
    <Drawer
      title={title}
      onClose={onClose}
      open={opened}
      className={"drawerContentDefault contentMinWidth"}
      width={"auto"}
      styles={{
        body: { padding: "1rem" },
      }}
      closable={false}
      destroyOnClose={true}
    >
      <Suspense>{contentRenderer({ onClose: onClose })}</Suspense>
    </Drawer>
  );
};

export default MevDrawer;
