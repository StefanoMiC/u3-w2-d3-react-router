import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";

const TopBar = ({ brand, claim }) => {
  const location = useLocation();
  // console.log(location);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid="xl">
        <Navbar.Brand href="#home">
          {brand} — {claim}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className={`nav-link ${location.pathname === "/" && "active"}`} to="/">
              Home
            </Link>
            <Link className={`nav-link ${location.pathname === "/menu" && "active"}`} to="/menu">
              Menu
            </Link>
            <Link className={`nav-link ${location.pathname === "/prenotazioni" && "active"}`} to="/prenotazioni">
              Prenotazioni
            </Link>
            <Link className={`nav-link ${location.pathname === "/prenota" && "active"}`} to="/prenota">
              Prenota tavolo
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container fluid="xl">
    //     <Navbar.Brand href="#home">
    //       {brand} — {claim}
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //       <NavLink className="nav-link" to="/">
    //           Home
    //         </NavLink>
    //         <NavLink className="nav-link" to="/menu">
    //           Menu
    //         </NavLink>
    //         <NavLink className="nav-link" to="/prenotazioni">
    //           Prenotazioni
    //         </NavLink>
    //         <NavLink className="nav-link" to="/prenota">
    //           Prenota tavolo
    //         </NavLink>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default TopBar;
