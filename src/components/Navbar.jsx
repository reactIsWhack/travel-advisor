import React from "react";
import searchIcon from "../assets/search-icon.svg"

export default function Navbar({setUserInputLocation, setInformation}) {

  const input = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    setUserInputLocation(input.current.value);
    input.innerText = '';
    setInformation([]);
  }


  return (
    <nav>
      <div className="app-title">Travel Advisor</div>
      <div className="right-side">
        <div className="input-label">Explore new places</div>
        <div className="search-container">
          <div>
            <img src={searchIcon} />
          </div>
          <form onSubmit={handleSubmit}>
            <input ref={input} type="text" placeholder="Search..." />
          </form>
          
        </div>
      </div>
    </nav>
  )
}