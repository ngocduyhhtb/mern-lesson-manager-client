import React, {useContext} from 'react';
import {Navbar, Nav, Button} from "react-bootstrap";
import Logo from '../../assets/logo.svg';
import Logout from '../../assets/logout.svg';
import {Link} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

const NavBar = () => {
    const {authState: {user: {username}}, logoutUser} = useContext(AuthContext);
    const logout = () => {
        logoutUser();
    }
    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow align-items-center">
            <Navbar.Brand className="font-weight-border text-white">
                <img src={Logo} alt="Logo" width={32} height={32} className="mr-2"/>
                Learn IT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav align-items-center">
                <Nav className="mr-auto align-items-center">
                    <Nav.Link className="font-weight-border text-white" to="/dashboard" as={Link}>Dashboard</Nav.Link>
                    <Nav.Link className="font-weight-border text-white" to="/about" as={Link}>About</Nav.Link>
                </Nav>
                <Nav className="align-items-center">
                    <Nav.Link className="font-weight-border text-white mr-2"
                              disabled={true}>Welcome {username.toUpperCase()}</Nav.Link>
                    <Button variant="secondary" className="font-weight-border text-white" onClick={logout}>
                        <img src={Logout} alt="Logout" width={32} height={32} className="mr-2"/>
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;