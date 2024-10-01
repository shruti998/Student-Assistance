//Navbar component
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logo.png'
import { useRecoilState, useRecoilValue } from "recoil";
import { authSelector, authTokenState } from "../../Auth/authSelector";
import { useEffect } from "react";
export default function Navbar() {
  var [authToken, setAuthToken] = useRecoilState(authTokenState);
  const auth = useRecoilValue(authSelector);

  setAuthToken(window.sessionStorage.getItem("authToken"));

  return (
    <nav className="nav-container">
      <Link to="/" className="title">
      <a href="/"><img className='logo' src={logo} alt='logo'></img></a>
        StudentAssistance
      </Link>
      <ul>
      {auth.status ? (
        <>
          {auth.type == "user" ? (
            <>
              <CustomMadeLink to="/housings">Housing</CustomMadeLink>
              <CustomMadeLink to="/roommate">Roomate</CustomMadeLink>
              <CustomMadeLink to="/events">Events</CustomMadeLink>
              <CustomMadeLink to="/profile"><FontAwesomeIcon icon={faUser} /></CustomMadeLink>
            </>
          ) : (
            <>
              <CustomMadeLink to="/admin">Admin Page</CustomMadeLink>
            </>
          )}
        </>
      ) : (
        <>
          <CustomMadeLink to="/register">Sign-in/Login</CustomMadeLink>
        </>
      )}
      </ul>
    </nav>
  )
}
//creating custom link so that code look more organized


function CustomMadeLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)// will get the link of the redirected page

// check is the class is active or not by checking the path name
  const isLinkActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isLinkActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}