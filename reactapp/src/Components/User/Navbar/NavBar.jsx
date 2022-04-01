import React from "react";
import "./NavBar.css";
import {Link} from "react-router-dom";
const NavBar = () => {
    return (
<nav className="navbar navbar-expand-lg custom-navbar" >
  <div className="container-fluid">
    <Link clasNames="navbar-brand" to="#">Rentx-Bike</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">My- Booking</Link>
        </li>
      </ul>
      <form class="d-flex">
        <button class="btn custom-btn" type="submit">Logout</button>
      </form>
     
    </div>
  </div>
</nav>
    )
}

export default NavBar;