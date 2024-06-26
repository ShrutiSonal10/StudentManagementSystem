import React, { useEffect } from 'react'
import { Link, useLocation} from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  useEffect(()=>{
    console.log(location.pathname);

  },[location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
    <Link className="navbar-brand" to="#">Logged in as a teacher</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className={`nav-item ${location.pathname==="/"?"active":""}`}>
          <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
        </li>
        <li className={`nav-item ${location.pathname==="/about" ? "active":""}`}>
          <Link className="nav-link"to="/about">About</Link>
        </li>
      </ul>
      <form className="d-flex">
        <Link className="btn btn-primary my-2 my-sm-0 mx-2" to = "/login" type="submit">Login</Link>
        <Link className="btn btn-primary my-2 my-sm-0" to ="/signup" type="submit">SignUp</Link>
      </form>
    </div>
  </nav>
  )
}

export default Navbar;