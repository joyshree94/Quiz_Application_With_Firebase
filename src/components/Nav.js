import { Link } from "react-router-dom";
import classes from '../styles/nav.module.css';
import logo from "../assets/images/logo-bg.png";
import Account from './Account';

export default function Nav(){

    return(
        <nav className={classes.nav}>
            <ul>
            <li>
                <Link to="/" className={classes.brand}>
                <img src={logo} alt="Learn with Sumit Logo" />
                <h3>Javascript Platform</h3>
                </Link>
            </li>
            </ul>
            <Account/>
         </nav>
    );
}