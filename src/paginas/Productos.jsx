import { useContext } from "react";
import Contexto from "../provider/Context";
import { NavLink } from "react-router-dom";

const Productos = () => {
  const { Productos } = useContext(Contexto);
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold mb-2">Productos</h1>
        <div className="w-full flex flex-wrap gap-4 text-start">
          {Productos.map((producto) => (
            <NavLink
              to={"/home/inicio"}
              key={producto.nombre}
              className="w-64 cursor-pointer"
            >
              <img
                src={producto.imagen}
                alt=""
                className="w-full  object-cover h-[252px] bg-white"
              />
              <p className="text-xl font-bold">{producto.nombre}</p>
              <p>{producto.descripcion}</p>
              <p className="font-bold text-blue-500">${producto.precio}</p>
            </NavLink>
          ))}
        </div>
      </section>
    </>
  );
};

export default Productos;
