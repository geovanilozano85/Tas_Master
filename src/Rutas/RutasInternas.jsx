import { Routes, Route } from "react-router-dom";
import Inicio from "../paginas/Inicio";
import Cotizacion from "../paginas/Cotizacion";
import Productos from "../paginas/Productos";
import Usuarios from "../paginas/Usuarios";

const RutasInternas = () => {
  return (
    <Routes>
      <Route path={"/inicio"} element={<Inicio />} />
      <Route path={"/Coltizaciones"} element={<Cotizacion />} />
      <Route path={"/productos"} element={<Productos />} />
      <Route path={"/usuarios"} element={<Usuarios />} />
    </Routes>
  );
};

export default RutasInternas;
