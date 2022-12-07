import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import Add from "./pages/Add";
import View from "./pages/View";
import Edit from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/addContact" element={<Add />}></Route>
        <Route path="/update/:id" element={<Edit/>}></Route>
        <Route path="/view/:id" element={<View/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
