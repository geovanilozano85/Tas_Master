import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Contexto from "../provider/Context";

const Login = () => {
  const { setUsuario } = useContext(Contexto);
  const { register, handleSubmit } = useForm();

  const navegacion = useNavigate();

  const autenticacion = (datos) => {
    fetch("http://localhost:3000/api/login/authUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.msg);
          });
        }
        return res.json();
      })
      .then((data) => {
        setUsuario(data.user);
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        navegacion("/home/inicio");
      })
      .catch((e) => {
        alert(e.message);
        console.log(e);
      });
  };

  return (
    <>
      <div className="min-h-screen  flex flex-col justify-center items-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-xl font-bold text-center text-gray-900">
            ZTECHNOLOGY
          </h1>

          <form
            onSubmit={handleSubmit(autenticacion)}
            className="space-y-6 mt-8"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border border-gray-300 p-4 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email"
                {...register("correo")}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-lg border border-gray-300 p-4 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
                {...register("contrasena")}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Sign up
                </a>
              </p>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-200 ease-in"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
