const ModalDetalle = ({ detalle, close, info }) => {
  if (!detalle) {
    return <div>cargando...</div>;
  }
  const { fecha, precio_total, estado_pedido, clientes } = info;

  const cliente = clientes && clientes.nombre ? clientes.nombre : "cargando...";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 w-full text-gray-200">
      <div className="flex flex-col items-start mb-2 p-3   rounded-lg shadow-lg backdrop-blur-sm bg-white w-[30rem] ">
        <h2 className="text-lg font-bold text-blue-500">Detalle de la orden</h2>
        <div className="w-full flex  justify-between gap-2 flex-wrap">
          <p className="text-lg font-bold text-gray-700">fecha: {fecha}</p>
          <p className="text-lg font-bold text-gray-700">
            precio total: ${precio_total}
          </p>
          <p className="text-lg font-bold text-gray-700">
            estado: {estado_pedido === "1" ? "Activo" : "Cancelado"}
          </p>
          <p className="text-lg font-bold text-gray-700">cliente: {cliente}</p>
        </div>
        <div className="w-full flex flex-col justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-600 text-start">
            productos:
          </h3>
          {detalle.map((producto, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-start bg-slate-400 rounded-lg p-2"
              >
                <img
                  src={producto.productos.imagen}
                  alt={producto.productos.nombre}
                  className="w-20 h-20 rounded-full"
                />
                <p className="font-bold">{producto.productos.nombre}</p>
                <p>{producto.productos.descripcion}</p>
                <p>${producto.productos.precio}</p>
              </div>
            );
          })}
        </div>
        <button className="text-red-500 font-bold" onClick={() => close(false)}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalDetalle;
