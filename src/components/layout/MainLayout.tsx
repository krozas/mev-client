import App from "@/App";
import { Layout, theme } from "antd";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import SideBarComponent from "./SideBarComponent";

const { Content } = Layout;

export default function MainLayout() {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <HeaderComponent minimal={false} />
      <Layout className="custom-layout">
        {<SideBarComponent />}
        <Layout className="p-4">
          <Content
            className="p-4 m-0 container-layout"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense >
              <App>
                <Outlet />
              </App>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
