import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Taskmanagement from './Pages/Taskmanagement';


function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Signin />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/task" element={<Taskmanagement />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
