import escudoUrl from "./../../assets/escudo.png";

export interface AppLogoProps {
  width?: number | string;
  height?: number | string;
}

export default function AppLogo({ width = "100px", height = "100px" }: Readonly<AppLogoProps>) {
  return (
    <img
      width={width}
      height={height}
      src={escudoUrl}
      alt="Escudo Poder Judicial de Neuquén"
      aria-label="Ir al Inicio"
    />
  );
}
