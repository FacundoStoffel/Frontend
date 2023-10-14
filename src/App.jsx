import { Route, Routes } from "react-router-dom";
import './styles/App.css';
import Inicio from "./Inicio";
import Login from "./Login";
import Menu from "./Menu";
import Reservas from "./Reservas";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reservas" element={<Reservas />}></Route>
      </Routes>
    </>


  );
}

export default App;
