import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
// import Update from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/addContact" element={<AddEdit />}></Route>
        <Route path="/update/:id" element={<AddEdit/>}></Route>
        <Route path="/view/:id" element={<View/>}></Route>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
