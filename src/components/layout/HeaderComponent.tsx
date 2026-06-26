import config from "@config/config";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import AppLogo from "./AppLogo";

const { Header } = Layout;

interface Props {
  minimal?: boolean;
}

const AppTitleContent = () => (
  <div className="flex items-center gap-4">
    <AppLogo width={40} height={40} />
    <span className="text-white font-semibold text-xl">{config.appTitle}</span>
  </div>
);

export default function HeaderComponent({ minimal }: Readonly<Props>) {
  return (
    <Header className={`flex items-center justify-between py-0 px-8`}>
      <div className=" horizontal-layout items-center gap-4">
        {minimal ? (
          <AppTitleContent />
        ) : (
          <Link to="/">
            <AppTitleContent />
          </Link>
        )}
      </div>
    </Header>
  );
}
