# ProEvent Frontend

React frontend client for the ProEvent platform, built with Vite. It consumes the ProEvent API and provides a responsive UI.

## 🚀 Tecnologías

- React 19
- Vite
- React Router DOM para navegación
- Axios para consumo de API
- Vanilla CSS / CSS Modules para estilos modernos con Glassmorphism

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para correr el frontend en tu entorno local:

1. **Entrar a la carpeta del frontend**:
   ```bash
   cd frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible típicamente en `http://localhost:5173`.

## 📁 Estructura

- `src/components`: Componentes reutilizables (Navbar, Cards, Modals).
- `src/pages`: Páginas principales (Home, Dashboard, EventDetails, Login, Register).
- `src/services`: Configuración de Axios y funciones para llamadas a la API (`api.js`).
- `src/context`: Manejo del estado global (ej. estado de autenticación).
