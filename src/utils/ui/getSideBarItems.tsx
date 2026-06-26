import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { configuracionRoutes } from "@modules/configuracion/routes";
import { expedientesRoutes } from "@modules/expedientes/routes";
import { MenuProps } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

export function getSideBarItems() {
  //TODO: Actualizar con codigo por preferencias cuando sea necesario
  const items = [];

  let subItems = [];
  const configuracion = configuracionRoutes;
  if (configuracion) {
    for (const item of configuracion.children) {
      if (item.path) {
        subItems.push({
          icon: item.icon ?? undefined,
          label: item.path,
          url: item.path ? `/configuracion/${item.path}` : "/configuracion",
        });
      }
    }
    items.push({
      icon: SettingOutlined,
      label: "Configuración",
      key: "/configuracion",
      children: subItems,
    });
  }
  const expedientes = expedientesRoutes;
  if (expedientes) {
    subItems = [];
    for (const item of expedientes.children) { 
      if (item.path && !item.path.startsWith("ver/:idExpediente")) {
        subItems.push({
          icon: item.icon ?? undefined,
          label: item.path,
          url: item.path ? `/expedientes/${item.path}` : "/expedientes",
        });
      }
    }

    items.push({
      icon: HomeOutlined,
      label: "Expedientes",
      key: "/expedientes",
      children: subItems,
    });
  }

 
  const itemsAntd: MenuProps["items"] = items.map((item) => {
    return {
      key: item.key,
      icon: React.createElement(item.icon),
      label: item.label,

      children: item.children?.map((child) => {
        return {
          key: child.url,
          label: <NavLink to={child.url}>{child.label}</NavLink>,
          icon: child.icon ?? undefined,
        };
      }),
    };
  });
  return itemsAntd;
}
