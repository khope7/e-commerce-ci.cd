import { Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import React from "react";
import './NavBar.css'


// Creating Navbar elements for website navigation
const NavBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="navBar">
      <Navbar>
        <Nav >
          <Nav.Link className="navText" href="/"> Products |</Nav.Link>
          <Nav.Link className="navText" href="/cart"> Shopping Cart |</Nav.Link>
          {/* Showing Certain Nav bars depending on user authentication */}
          {user ? (
            <>
              <Nav.Link className="navText" href="/createUser"> Create User |</Nav.Link>
              <Nav.Link className="navText" href="/showUsers"> Show Users |</Nav.Link>
              <Nav.Link className="navText" href="/createProduct"> Create Product |</Nav.Link>
              <Nav.Link className="navText" href="/showProducts"> Show Products |</Nav.Link>
              <Nav.Link className="navText" href="/profile"> Profile |</Nav.Link>
              <Nav.Link className="navText" href="/logout"> Logout |</Nav.Link>

            </>
          ) : (
            <>
              <Nav.Link className="navText" href="/login"> Login |</Nav.Link>
              <Nav.Link className="navText" href="/register"> Register |</Nav.Link>            
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;