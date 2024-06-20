import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Contexto from "../../provider/Context";

const Hedader = () => {
  const { Usuario } = useContext(Contexto);
  const { nombres, documento, correo, id_rol } = Usuario;
  const [open, setOpen] = useState(false);

  const rol = id_rol === 1 ? "admin" : "cliente";
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header className=" bg-gray-200 rounded-full mb-4 mx-auto  max-w-screen-xl px-3">
        <div className=" ">
          <div className="flex h-16 items-center justify-between">
            <NavLink
              to={"/home/inicio"}
              className="md:flex md:items-center md:gap-12"
            >
              <h1 className="text-3xl font-bold text-blue-500">ZTECHNOLOGY</h1>
            </NavLink>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <NavLink
                      to={"/home/inicio"}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold"
                      href="#"
                    >
                      {" "}
                      Inicio{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"/home/productos"}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold"
                      href="#"
                    >
                      {" "}
                      productos{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"/home/Coltizaciones"}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold"
                      href="#"
                    >
                      {" "}
                      Coltizaciones{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"/home/usuarios"}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold"
                      href="#"
                    >
                      {" "}
                      usuarios{" "}
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4 relative">
                <div
                  className="rounded-full bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer relative"
                  onClick={() => setOpen(!open)}
                >
                  {nombres}
                </div>
                {open && (
                  <div className="absolute -bottom-36 -left-20 w-56  bg-white rounded-lg shadow-lg ">
                    <div className="flex items-start justify-start h-full w-full text-gray-900 text-sm font-medium">
                      <div className="p-4 text-start">
                        <p> documento: {documento}</p>
                        <p className=" ">nombres: {nombres}</p>
                        <p>correo: {correo}</p>
                        <p className="font-bold text-amber-500"> {rol}</p>
                        <div className="flex gap-4 justify-between w-full">
                          <NavLink
                            to={"/home/usuarios"}
                            className="font-bold text-blue-500"
                          >
                            Editar
                          </NavLink>
                          <button
                            className="font-bold text-red-500"
                            onClick={cerrarSesion}
                          >
                            Salir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Hedader;
