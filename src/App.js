import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import DestinationComponent from './components/DestinationComponent';
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import LoginAdmin from "./components/LoginAdmin/LoginAdmin";
function App() {
  return (
    <>
    
   <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/destination" element={<DestinationComponent />}></Route> {/* Add this route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/LoginAdmin" element={<LoginAdmin />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
