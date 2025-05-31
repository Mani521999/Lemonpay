import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Taskmanagement from "./Pages/Taskmanagement";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/task" element={<Taskmanagement />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
