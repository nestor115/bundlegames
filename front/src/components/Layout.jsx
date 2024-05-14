import React from "react";
import NavigationBar from "./NavigationBar";

const Layout = ({ children, showButtons }) => {
  return (
    <div className="min-h-screen bg-orange-200">
      {/* Aquí puedes incluir tu barra de navegación, encabezado, pie de página, etc. */}
      <NavigationBar showButtons={showButtons} />

      {children}

      <footer className=" bg-orange-300 text-center py-4">
        Author: Néstor de Frutos
      </footer>
    </div>
  );
};

export default Layout;
