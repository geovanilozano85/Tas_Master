import { Routes, Route } from 'react-router-dom';
import './App.css';  // Asegúrate de que el archivo se llama 'App.css' y está en la misma carpeta
import Login from './components/Login'
import Home from './components/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/home/*'  element={<Home/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
