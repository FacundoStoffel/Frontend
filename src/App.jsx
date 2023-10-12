import { Route, Routes } from "react-router-dom";
import './App.css';
import Inicio from "./Inicio";
import Login from "./Login";
import Menu from "./Menu";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/login" element={<Login />}></Route>
        
      </Routes>
    </>


  );
}

export default App;
