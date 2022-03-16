import logo from "./logo.svg";
import "./App.css";
import AddProfile from "./component/addProfile/AddProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdateProfile from "./component/updateProfile/UpdateProfile";
import Home from "./component/Home";
import Admin from "./component/admin/Admin";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/addprofile" element={<AddProfile/>}/>
          <Route path="/updateprofile" element={<UpdateProfile/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
