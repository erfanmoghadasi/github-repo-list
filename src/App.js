import "./App.css";
import React from 'react'
import Username from "./Pages/username/Username";
import MostPopular from "./Pages/pupolar/MostPopular";

//react-router-dom
import { Routes, Route, Link } from "react-router-dom";



function App() {



  return (
    <div className="App">
      <Link className="link-btn" to="/username">usrname</Link>
      <Link className="link-btn" to="/most-popular">most-popular</Link>
      <Routes>
        <Route path="/username" element={<Username />} />
        <Route path="/most-popular" element={<MostPopular />} />
      </Routes>
    </div>
  );
}

export default App;
