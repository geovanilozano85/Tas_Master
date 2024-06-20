import Contexto from "./Context";
import { useState, useEffect } from "react";

const Provider = ({ children }) => {
  const [Clientes, setClientes] = useState([]);
  const [Usuario, setUsuario] = useState([]);
  const [Ordenes, setOrdenes] = useState([]);
  const [Productos, setProductos] = useState([]);
  const [Trabajadores, setTrabajadores] = useState([]);

  const getProductos = () => {
    fetch("http://localhost:3000/api/product/consult-allProducts")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getClientes = () => {
    fetch("http://localhost:3000/api/client/consult-allClients")
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getOrdenes = () => {
    fetch("http://localhost:3000/api/order/consult-allOrders")
      .then((res) => res.json())
      .then((data) => {
        setOrdenes(data.orders);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTrabajadores = () => {
    fetch("http://localhost:3000/api/user/consult-allUser")
      .then((res) => res.json())
      .then((data) => {
        setTrabajadores(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const persistenciaDeDatos = () => {
    const usuario = localStorage.getItem("user");
    if (usuario) {
      setUsuario(JSON.parse(usuario));
    }
  };

  useEffect(() => {
    getClientes();
    getProductos();
    getOrdenes();
    persistenciaDeDatos();
    getTrabajadores();
  }, []);

  return (
    <>
      <Contexto.Provider
        value={{
          Productos,
          setProductos,
          Ordenes,
          setOrdenes,
          Usuario,
          setUsuario,
          Clientes,
          setClientes,
          Trabajadores,
          setTrabajadores,
        }}
      >
        {children}
      </Contexto.Provider>
    </>
  );
};

export default Provider;
