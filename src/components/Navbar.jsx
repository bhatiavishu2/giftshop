import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useHistory } from "react-router-dom";
import { imagesUrl, apkName } from "../constants";
import { AuthStateContext, signOut, AuthDispatchContext } from "contexts/auth";
import NavDropdown from "react-bootstrap/NavDropdown";
import Notification from "./Notification";
import {
  CartStateContext,
  CartDispatchContext,
  toggleCartPopup
} from "contexts/cart";
import { CommonDispatchContext, setSearchKeyword } from "contexts/common";
import CartPreview from "components/CartPreview";
import {Permissions} from '../constants/common'

function Header({ navConfig, cartBounce }) {
  const [isOpen, setOpen] = useState(false);
  const authState = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);
  const history = useHistory();
  const adminPages = navConfig.filter(
    (nav) => nav.showInDropdown && authState.hasPermissions(nav.permissions)
  );
  const { items: cartItems, isCartOpen } = useContext(CartStateContext);
  const commonDispatch = useContext(CommonDispatchContext);
  const cartDispatch = useContext(CartDispatchContext);
  const cartQuantity = cartItems.length;
  const cartTotal = cartItems
    .map((item) => (authState.hasPermissions([Permissions.RESELLER,Permissions.SHOPKEEPER])?  item.wholeSalePrice:item.price) * item.quantity)
    .reduce((prev, current) => prev + current, 0);

  const handleCartButton = (event) => {
    event.preventDefault();
    return toggleCartPopup(cartDispatch);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          {" "}
          <Link className="navbar-brand" to="/">
            {" "}
            <img className="logo" src="/logo.png" alt="MB Group" width="75" />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {navConfig.map(
              (nav) =>
                nav.showNav &&
                authState.hasPermissions(nav.permissions) && (
                  <Link key={nav.id} className="nav-link" to={nav.path}>
                    {" "}
                    {nav.title}
                  </Link>
                )
            )}

            {!!adminPages.length && (
              <>
                <NavDropdown title="Admin Pages" id="collasible-nav-dropdown">
                  {navConfig.map(
                    (nav) =>
                      nav.showInDropdown &&
                      authState.hasPermissions(nav.permissions) && (
                        <>
                          <Link
                            key={nav.id}
                            className="dropdown-item"
                            to={nav.path}
                          >
                            {" "}
                            {nav.title}
                          </Link>
                          <NavDropdown.Divider key={nav.id} />
                        </>
                      )
                  )}
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav>
          {  <div className="cart">
          <div className="cart-info">
            <table>
              <tbody>
                <tr>
                  <td>No. of items</td>
                  <td>:</td>
                  <td>
                    <strong>{cartQuantity}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>:</td>
                  <td>
                    <strong>{cartTotal}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <a className="cart-icon" href="#" onClick={handleCartButton}>
            <img
              className={cartBounce ? "tada" : " "}
              src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
              alt="Cart"
            />
            {cartQuantity ? (
              <span className="cart-count">{cartQuantity}</span>
            ) : (
              ""
            )}
          </a>
          <CartPreview />
        </div>}
            {authState.user && (
              <a
                className="nav-link"
                href={`${imagesUrl}/${apkName}`} //"https://api.mbgroup.shop/static/1667891057438-picture.apk"
                download
              >
                Download Android App
              </a>
            )}

            <div style={{ position: "relative" }}>
              {" "}
              <a
                href=""
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!isOpen);
                }}
              >
                {" "}
                <img
                  width="35"
                  src="/bell.png"
                  alt="user"
                  title="edit profile"
                />
              </a>
              {isOpen && <Notification handleClose={() => setOpen(false)} />}
            </div>

            {!authState.user && (
              <Link className="nav-link" to="/auth">
                {" "}
                <img width="35" src="/login.png" alt="login" title="login" />
                Login
              </Link>
            )}
            
            {authState.user && (
              <Link className="nav-link" to="/editProfile">
                {" "}
                <img
                  width="35"
                  src="/user.png"
                  alt="user"
                  title="edit profile"
                />
              </Link>
            )}
            {authState.user && (
              <a
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  signOut(dispatch);
                  history.push("/");
                  window.location.reload();
                }}
              >
                {" "}
                <img title="logout" width="35" src="/logout.png" alt="logout" />
              </a>
            )}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
