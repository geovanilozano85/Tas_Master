import { useContext } from "react";
import Contexto from "../provider/Context";
import { useForm } from "react-hook-form";

const Usuarios = () => {
  const { Trabajadores, setTrabajadores, Usuario, setUsuario } =
    useContext(Contexto);
  const { nombres, documento, correo, id_rol, id, contraseVista } = Usuario;
  const { register, handleSubmit } = useForm();

  const rolUSer = id_rol === 1 ? "admin" : "empleado";

  const crearUser = (data) => {
    fetch("http://localhost:3000/api/user/saveUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setTrabajadores([...Trabajadores, data]);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:3000/api/user/deleteUser/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setTrabajadores(Trabajadores.filter((usuario) => usuario.id !== id));
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(rolUSer);

  const crearUsuario = (data) => {
    const usuario = {
      id: id,
      documento: data.documentoU || documento,
      nombres: data.nombresU || nombres,
      correo: data.correoU || correo,
      contrasena: data.contrasenaU || contraseVista,
      id_rol: id_rol.toString(),
    };
    fetch("http://localhost:3000/api/user/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then(() => {
        setUsuario(usuario);
        window.localStorage.setItem("user", JSON.stringify(usuario));
        window.location.reload();
      });
    console.log(usuario);
  };
  return (
    <>
      <form onSubmit={handleSubmit(crearUser)}>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  id
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  documento
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  nombres
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  correo
                </th>
                <th>contrasena</th>
                <th>id_rol</th>
                {rolUSer === "admin" && <th>Acciones</th>}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {Trabajadores.map((usuario, index) => {
                const rol = usuario.id_rol === 1 ? "admin" : "empleado";
                const contrasena =
                  (usuario.contraseVista === null) |
                  (usuario.contraseVista === undefined)
                    ? "*****"
                    : usuario.contraseVista;
                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border">
                      {usuario.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 border">
                      {usuario.documento}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 border">
                      {usuario.nombres}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 border">
                      {usuario.correo}
                    </td>
                    <td className="border">{contrasena}</td>
                    <td>{rol}</td>
                    {rolUSer === "admin" && (
                      <td className="border cursor-pointer">
                        <p
                          className="text-red-500 font-bold"
                          onClick={() => handleRemove(usuario.id)}
                        >
                          Eliminar
                        </p>
                      </td>
                    )}
                  </tr>
                );
              })}

              {rolUSer === "admin" && (
                <>
                  <tr>
                    <td className="border">
                      <input type="text" className="w-full px-2" disabled />
                    </td>
                    <td className="border">
                      <input
                        type="text"
                        className="w-full px-2"
                        {...register("documento")}
                      />
                    </td>
                    <td className="border">
                      <input
                        type="text"
                        className="w-full px-2"
                        {...register("nombres")}
                      />
                    </td>
                    <td className="border">
                      <input
                        type="text"
                        className="w-full px-2"
                        {...register("correo")}
                      />
                    </td>
                    <td className="border">
                      <input
                        type="text"
                        className="w-full px-2"
                        {...register("contrasena")}
                      />
                    </td>
                    <td className="border">
                      <select name="rol" id="rol" {...register("id_rol")}>
                        <option value="1">admin</option>
                        <option value="2">empleado</option>
                      </select>
                    </td>
                    <td className="border">
                      <button className="text-blue-500 font-bold h-7">
                        agregar
                      </button>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </form>

      <section className="mt-10 w-full">
        <h2 className="text-3xl font-bold">
          Configuracion <span className="text-teal-600">{nombres}</span>{" "}
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mt-5">
          <form onSubmit={handleSubmit(crearUsuario)}>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    id
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    documento
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    nombres
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    correo
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    contrasena
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    id_rol
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border">
                    <input
                      type="text"
                      className=" px-2"
                      placeholder={id}
                      disabled
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 border">
                    <input
                      type="text"
                      placeholder={documento}
                      className="placeholder:text-gray-900"
                      {...register("documentoU")}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 border">
                    <input
                      type="text"
                      placeholder={nombres}
                      className="placeholder:text-gray-900"
                      {...register("nombresU")}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 border">
                    <input
                      type="text"
                      placeholder={correo}
                      className="placeholder:text-gray-900"
                      {...register("correoU")}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 border">
                    <input
                      type="text"
                      placeholder={contraseVista}
                      className="placeholder:text-gray-900"
                      {...register("contrasenaU")}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 border">
                    <input
                      type="text"
                      placeholder={rolUSer}
                      className="placeholder:text-gray-900"
                      disabled
                      {...register("id_rolU")}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 border">
                    <button className="text-blue-500 font-bold h-7">
                      Guardar cambios
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </section>
    </>
  );
};

export default Usuarios;
