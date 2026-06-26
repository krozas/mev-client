# DGI- MEV 

# 🌐 Frontend con Vite + React + Ant Design + TypeScript

Este proyecto es una aplicación frontend creada con **Vite**, utilizando **React**, **Ant Design (antd)** para la UI y **TypeScript** para proporcionar tipado estático y mayor robustez en el desarrollo.
Proyecto para MEV. Concurso Programador/a de Aplicaciones Informáticas Senior MF6 
 
---

## 🚀 Tecnologías principales

* ⚡ **Vite** – Bundler rápido y moderno
* ⚛️ **React** – Biblioteca para interfaces de usuario
* 🎨 **Ant Design** – Componentes UI estilizados y profesionales
* 🔒 **TypeScript** – Tipado estático
* 🧹 **ESLint + Prettier**  

---

## 📁 Estructura del proyecto

```
project/
├── src/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── modules/
│   ├── pages/
│   ├── styles/
│   ├── assets/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📦 Instalación

Clonar el repositorio e instalar dependencias:
git clone https://github.com/dgi-mev/dgi-mev-client.git

```bash
npm install
```
 
## ▶️ Ejecutar en modo desarrollo

```bash
npm run dev
```

Luego abre:

```
http://localhost:9001
```

---

## 🎨 Uso de Ant Design

Ant Design ya está configurado para uso inmediato.

Ejemplo básico:

```tsx
import { Button } from "antd";

export default function Home() {
  return <Button type="primary">Hola desde Ant Design</Button>;
}
```

---

## ⚙️ Configuración de Vite

`vite.config.ts` incluye configuración recomendada para React + TS:
 
---

## 🛠️ Scripts principales

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```
 
 