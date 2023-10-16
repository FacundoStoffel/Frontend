import { Route, Routes } from "react-router-dom";
import './styles/App.css';
import Inicio from "./Inicio";
import Login from "./Login";
import Menu from "./Menu";
import Reservas from "./Reservas";
import { ReservasEdit } from "./ReservasEdit";
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import Registro from "./Registro";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reservas" element={<Reservas />}></Route>
        <Route path="/reservas/edit" element={<ReservasEdit />}></Route>
        <Route path="/register" element={<Registro/>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </>


  );
}

export default App;
