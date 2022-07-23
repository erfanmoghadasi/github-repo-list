import React, { useState } from "react";

function MostPopular() {
  const [search, setSearch] = useState("");
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="mainContainer">
      <div className="inputContainer">
        <input type="text" value={search} onChange={searchHandler} />
      </div>

      <div className="starsTable">
        
      </div>
    </div>
  );
}

export default MostPopular;
