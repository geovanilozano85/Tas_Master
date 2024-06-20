import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useContext, useState } from "react";
import Contexto from "../provider/Context";
import { useForm } from "react-hook-form";
import ModalDetalle from "../components/ModalDetalle";

const transactionData = {
  labels: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  datasets: [
    {
      label: "Total de Transacciones ($)",
      data: [500, 600, 550, 700, 800, 900, 1000, 800, 750, 900, 950, 1000],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 0.8)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const transactionOptions = {
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

const Inicio = () => {
  const { Ordenes, Productos, Clientes, setProductos, setClientes } =
    useContext(Contexto);
  const { register, handleSubmit } = useForm();
  const [detalle, setDetalle] = useState();
  const [open, setOpen] = useState(false);
  const [detalleOrden, setDetalleOrden] = useState();

  if (!Ordenes) {
    return <div>cargando...</div>;
  }

  const onSubmit = (data) => {
    const producto = {
      nombre: data.nombre_producto,
      descripcion: data.descripcion_producto,
      precio: data.precio_producto,
      imagen: data.imgaen_producto,
    };
    console.log(producto);
    fetch("http://localhost:3000/api/product/saveProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    })
      .then((res) => res.json())
      .then(() => {
        setProductos([...Productos, producto]);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onDelete = (id) => {
    fetch(`http://localhost:3000/api/product/deleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then(() => {
        setProductos(Productos.filter((product) => product.id !== id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createClient = (data) => {
    const cliente = {
      nombre: data.nombre,
      correo: data.correo,
      telefono: data.telefono,
    };
    fetch("http://localhost:3000/api/client/createClient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    })
      .then((res) => res.json())
      .then(() => {
        setClientes([...Clientes, cliente]);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(cliente);
  };

  const onDeleteClient = (id) => {
    fetch(`http://localhost:3000/api/client/deleteClient/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then(() => {
        setClientes(Clientes.filter((client) => client.id !== id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onDeleteOrden = (id, estado) => {
    const actualizarEstado = estado === "1" ? "0" : "1";

    fetch("http://localhost:3000/api/order/updateOrder", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, estado_pedido: actualizarEstado }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const consulDetalle = (id, ordenes) => {
    fetch(`http://localhost:3000/api/orderDetail/consultOrderDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetalle(data);
        setOpen(true);
        setDetalleOrden(ordenes);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="p-5 flex flex-wrap justify-center gap-4">
      <div className="bg-white border rounded-lg shadow-lg p-4 w-[47%]">
        <h2 className="font-bold text-lg ">Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="min-w-full bg-white  ">
            <thead>
              <tr>
                <th className="py-2 text-start ">M de Arduino</th>
                <th className="py-2 text-start">Descripción</th>
                <th className="py-2 text-start">Precio </th>
                <th className="py-2 text-start ">Imagen </th>
                <th className="py-2 text-start">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Productos.map((product, index) => (
                <tr key={index}>
                  <td className="border text-start px-1 line-clamp-1">
                    {product.nombre}
                  </td>
                  <td className="border  text-start  px-1 ">
                    <p className="line-clamp-1">{product.descripcion}</p>
                  </td>
                  <td className="border text-start px-1">{product.precio}</td>
                  {/* <td className="border text-start px-1 w-20 flex flex-wrap line-clamp-1">
                    {
                  </td> */}
                  <td className="border text-start px-1  ">
                    http//imagen.....
                  </td>
                  <td className="border  text-start px-1 justify-center items-center flex ">
                    <spans
                      className="text-red-500 font-bold cursor-pointer"
                      onClick={() => onDelete(product.id)}
                    >
                      Eliminar
                    </spans>
                  </td>
                </tr>
              ))}
              <td className="border">
                {" "}
                <input
                  type="text"
                  className="w-full px-2"
                  {...register("nombre_producto")}
                />
              </td>
              <td className="border">
                {" "}
                <input
                  type="text"
                  className="w-full px-2"
                  {...register("descripcion_producto")}
                />
              </td>
              <td className="border">
                {" "}
                <input
                  type="text"
                  className="w-full px-2"
                  {...register("precio_producto")}
                />
              </td>
              <td className="border">
                <input
                  className="w-full px-2"
                  type="text"
                  {...register("imgaen_producto")}
                />
              </td>
              <td className="border">
                <button className="text-blue-500 font-bold">Agregar</button>
              </td>
            </tbody>
          </table>
        </form>
      </div>

      <div className="bg-white border rounded-lg shadow-lg p-4 w-[50%]">
        <h2 className="font-bold text-lg mb-2">Clientes</h2>
        <form onSubmit={handleSubmit(createClient)}>
          <table className="min-w-full bg-white w-[50%] ">
            <thead>
              <tr>
                <th className="py-2 text-start">Nombre</th>
                <th className="py-2 text-start">correo</th>
                <th className="py-2 text-start">telefono </th>
                <th className="py-2 text-start">acciones </th>
              </tr>
            </thead>
            <tbody>
              {Clientes.map((client, index) => (
                <tr key={index}>
                  <td className="border text-start px-1 ">{client.nombre}</td>
                  <td className="border  text-start  px-1">{client.correo}</td>
                  <td className="border text-start px-1">{client.telefono}</td>
                  <td className="border  text-start px-1 justify-center items-center flex">
                    <spans
                      className="text-red-500 font-bold cursor-pointer"
                      onClick={() => onDeleteClient(client.id)}
                    >
                      Eliminar
                    </spans>
                  </td>
                </tr>
              ))}
              <td className="border">
                {" "}
                <input
                  type="text"
                  className="w-full px-2"
                  {...register("nombre")}
                />
              </td>
              <td className="border">
                {" "}
                <input
                  type="text"
                  className="w-full px-2"
                  {...register("correo")}
                />
              </td>
              <td className="border">
                {" "}
                <input
                  type="text"
                  className="w-full px-2"
                  {...register("telefono")}
                />
              </td>
              <td className="border">
                <button className="text-blue-500 font-bold">Agregar</button>
              </td>
            </tbody>
          </table>
        </form>
      </div>

      <div className="bg-white border rounded-lg shadow-lg p-4 w-[48%]">
        <h2 className="font-bold text-lg mb-2">Transaction History</h2>
        <div style={{ height: "300px", width: "100%" }}>
          <Line data={transactionData} options={transactionOptions} />
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-lg p-4 w-[50%]">
        <h2 className="font-bold text-lg mb-2">Ordenes</h2>
        <table className="min-w-full bg-white w-[50%] ">
          <thead>
            <tr>
              <th className="py-2 text-start text-sm">id</th>
              <th className="py-2 text-start text-sm ">$ total </th>
              <th className="py-2 text-start text-sm">estado </th>
              <th className="py-2 text-start text-sm">cliente </th>
              <th className="py-2 text-start text-sm">correo </th>
              <th className="py-2 text-start text-sm">fecha</th>
              <th className="py-2 text-start text-sm">Cambiar estado</th>
            </tr>
          </thead>
          <tbody>
            {Ordenes.map((ordenes, index) => {
              const estado =
                ordenes.estado_pedido === "1" ? "Activo" : "Cancelado";

              const nombre =
                ordenes && ordenes.clientes && ordenes.clientes.nombre
                  ? ordenes.clientes.nombre
                  : "cargando...";
              const correo =
                ordenes && ordenes.clientes && ordenes.clientes.correo
                  ? ordenes.clientes.correo
                  : "cargando...";

              const cambiarEstado =
                ordenes.estado_pedido === "1" ? "Cancelar" : "Activar";

              return (
                <tr key={index}>
                  <td className="border text-start px-1 ">{ordenes.id}</td>
                  <td className="border text-start px-1">
                    {ordenes.precio_total}{" "}
                  </td>
                  <td className="border text-start px-1 text-blue-500 font-bold">
                    {estado}
                  </td>
                  <td className="border  text-start  px-1"> {nombre} </td>
                  <td className="border  text-start  px-1"> {correo}</td>
                  <td className="border  text-start  px-1">{ordenes.fecha}</td>
                  <td className="border">
                    <button
                      className="text-yellow-500 font-bold"
                      onClick={() =>
                        onDeleteOrden(ordenes.id, ordenes.estado_pedido)
                      }
                    >
                      {cambiarEstado}
                    </button>
                  </td>
                  <td
                    className="border text-blue-500 font-bold cursor-pointer"
                    onClick={() => {
                      consulDetalle(ordenes.id, ordenes);
                    }}
                  >
                    Ver
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {open && (
        <ModalDetalle detalle={detalle} close={setOpen} info={detalleOrden} />
      )}
    </div>
  );
};

export default Inicio;
