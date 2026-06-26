import { getSideBarItems } from "@utils/ui/getSideBarItems";
import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SideBarComponent() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const itemsSidebar = useMemo(() => {
    const itemsSidebar = getSideBarItems();

    return itemsSidebar;
  }, []);

  return (
    <Sider
      width={280}
      trigger={null}
      style={{ background: colorBgContainer }}
      collapsible
      collapsed={collapsed}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <Menu
        mode="inline"
        items={itemsSidebar}
        selectedKeys={[location.pathname]}
        onSelect={() => setCollapsed(true)}
        triggerSubMenuAction="click"
      />
      <div
        className={`pl-2 pb-2 fixed bottom-0 overflow-x-hidden `}
        style={{ width: collapsed ? "70px" : "280px" }}
      > 

      </div>
    </Sider>
  );
}
