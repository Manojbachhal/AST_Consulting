import Allroutes from "./Allroutes/Allroutes";
import "./App.css";
import Header from "./Components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Allroutes />
    </div>
  );
}

export default App;
