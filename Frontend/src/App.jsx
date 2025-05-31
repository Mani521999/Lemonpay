import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Taskmanagement from "./Pages/Taskmanagement";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/task" element={<Taskmanagement />} />
          </Routes>
        </BrowserRouter> */}
      <Router>
        <Routes>
         
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          />
           <Route
            path="/task"
            element={
              <PrivateRoute>
                <Taskmanagement />
              </PrivateRoute>
            }
          />
          {/* Default route */}
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
