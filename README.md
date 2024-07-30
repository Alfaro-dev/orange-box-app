# Orange Box App

## Descripción

Orange Box App es una aplicación frontend desarrollada en Next.js, que interactúa con la API de Orange Box para gestionar productos y proveedores.

## Requisitos Previos

- Node.js y npm

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Alfaro-dev/orange-box-app.git
   cd orange-box-frontend
   ```

2. Instalar dependencias de Node.js:
   ```bash
   npm install
   ```

3. Crear un archivo `.env.local` con la configuración necesaria:
   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost
   ```

4. Iniciar la aplicación:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

```
orange-box-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   └── products/
│   │       ├── add-product.tsx
│   │       ├── edit-product.tsx
│   │       └── index.tsx
│   ├── components/
│   │   ├── ProductForm.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProviderForm.tsx
│   │   └── ProviderList.tsx
│   ├── ducks/
│   │   ├── products/
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   ├── types.ts
│   │   ├── providers/
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   ├── types.ts
│   │   ├── store.ts
│   ├── pages/
│   └── utils/
├── public/
├── styles/
├── .env.local
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## Despliegue

El proyecto ha sido desplegado exitosamente en Render y puede ser accedido en la siguiente URL:

[Orange Box App](https://orange-box-app.onrender.com)
