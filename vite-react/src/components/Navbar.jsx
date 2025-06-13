import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import CSS module

export default function Navbar() {
  
    return (
    <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            
        </ul>
    </nav>
    );
}