import './App.css';
import { Inicio } from './Inicio';
import { Menu } from './Menu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu/>
        <Inicio/>
      </header>
    </div>
  );
}

export default App;
