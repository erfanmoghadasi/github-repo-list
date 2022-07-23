import "./App.css";
import React from 'react'
import Username from "./Pages/username/Username";
import MostPopular from "./Pages/pupolar/MostPopular";

//react-router-dom
import { Routes, Route, Link } from "react-router-dom";



function App() {
  const ListContext = React.createContext();

  return (
    <div className="App">
      <ListContext.Provider >
      <Link to="/username">usrname</Link>
      <Link to="/most-popular">most-popular</Link>
      <Routes>
        <Route path="/username" element={<Username />} />
        <Route path="/most-popular" element={<MostPopular />} />
      </Routes>
      </ListContext.Provider>
    </div>
  );
}

export default App;
