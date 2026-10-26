import React from "react"
import Form from "./Pages/Form"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import Developers from "./Pages/Developers"
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;