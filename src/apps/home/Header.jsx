import React from "react";
import "../../Theme/css/styles.css";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Header() {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  return (
    <div>
      <div
        className="header d-flex flex-row border align-items-center"
        style={{ width: "100vw", height: "10vh" }}
      >
        <h1 className="fs-3 mx-4">SkyHigh Pixels</h1>
        <div className="">
          <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>Business</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                    <Button>Restaurant</Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>Pricing</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>My Websites</Dropdown.Toggle>
              <Dropdown.Menu>
                <Link to="/quillish"><Button className="mx-2">Quillish</Button></Link>
                <Dropdown.Item eventKey="4-2"></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
