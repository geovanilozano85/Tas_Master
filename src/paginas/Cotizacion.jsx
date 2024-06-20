import { useContext, useState } from "react";
import Contexto from "../provider/Context";
import { useForm } from "react-hook-form";

const Cotizacion = () => {
  const { Clientes, Productos } = useContext(Contexto);
  const [PedidoOrden, setPedidoOrden] = useState([]);

  const { register, handleSubmit } = useForm();

  const handleAdd = (data) => {
    const { id, nombre, precio, imagen } = data;

    const validarProdcuto = PedidoOrden.some((producto) => producto.id === id);

    if (!validarProdcuto) {
      const producto = {
        id,
        nombre,
        precio,
        imagen,
        cantidad: 1,
      };
      setPedidoOrden([...PedidoOrden, producto]);
    } else {
      alert("ya existe el producto");
    }
  };

  const sumerCantidad = (id) => {
    setPedidoOrden(
      PedidoOrden.map((producto) => {
        if (producto.id === id) {
          producto.cantidad += 1;
          return producto;
        }
        return producto;
      })
    );
  };

  const restarCantidad = (id) => {
    setPedidoOrden(
      PedidoOrden.map((producto) => {
        if (producto.id === id) {
          if (producto.cantidad <= 1) return producto;
          producto.cantidad -= 1;
          return producto;
        }
        return producto;
      })
    );
  };
  const totalPrice = PedidoOrden.reduce((sum, item) => {
    return sum + item.precio * item.cantidad;
  }, 0);

  const enviar = (data) => {
    const productos = PedidoOrden.map((producto) => {
      return { id_producto: producto.id, cantidad: producto.cantidad };
    });
    const order = {
      id_cliente: Number(data.id_cliente),
      precio_total: totalPrice,
      productos: productos,
    };
    fetch("http://localhost:3000/api/order/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.error);
        window.location.href = "http://localhost:5174/home/inicio";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="w-full  mx-auto max-w-screen-xl bg-white rounded-lg flex flex-col gap-2 p-4">
        <h1 className="text-3xl font-bold">Cotizacion</h1>
        <form
          onSubmit={handleSubmit(enviar)}
          className="w-full flex justify-center gap-4 flex-col"
        >
          <div className="rounded-lg p-4 h-auto border border-gray-200">
            <select name="cliente" id="cliente" {...register("id_cliente")}>
              {Clientes.map((cliente, index) => (
                <option key={index} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      id
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      nombre
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      descripcion
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      precio
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Productos.map((producto, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {producto.id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {producto.nombre}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {producto.descripcion}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {producto.precio}
                      </td>
                      <td>
                        <p
                          className="bg-blue-500 px-2 py-1 rounded-lg text-white font-bold cursor-pointer"
                          onClick={() => handleAdd(producto)}
                        >
                          agregar
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {PedidoOrden.length > 0 && (
            <>
              <section>
                <h2 className="text-2xl font-bold">Resumen de pedido</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          imagen
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          nombre
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          precio
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          cantidad
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {PedidoOrden.map((producto, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            <img
                              src={producto.imagen}
                              alt=""
                              className="w-8 h-8"
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {producto.nombre}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {producto.precio}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-blue-700 font-bold">
                            {producto.cantidad}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex gap-2 justify-center">
                            <span onClick={() => restarCantidad(producto.id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 cursor-pointer hover:text-red-700"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </span>
                            <span onClick={() => sumerCantidad(producto.id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 cursor-pointer hover:text-green-700"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              <div className="w-full flex justify-between items-center gap-4 p-2">
                <p className="text-xl font-bold text-green-500">
                  Total: {totalPrice}
                </p>
                <div className="flex gap-4">
                  <span
                    className="rounded-lg bg-red-500 p-2 text-white font-semibold cursor-pointer"
                    onClick={() => setPedidoOrden([])}
                  >
                    Cancelar
                  </span>
                  <button className="rounded-lg bg-blue-500 p-2 text-white font-semibold">
                    Enviar
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </section>
    </>
  );
};

export default Cotizacion;
