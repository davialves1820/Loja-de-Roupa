import { LuCircleUser, LuMenu, LuShoppingCart } from 'react-icons/lu';
import Styles from './navbar.module.css'
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [open_menu, set_open_menu] = useState(false);

    const handle_open_menu = () => {
        set_open_menu(!open_menu);
    }

    return (
        <nav className={Styles.navbarContainer}>
            <div className={Styles.navbarItems}>
                <Link to={"/"}>
                    <img className={Styles.logo} src="#" alt=""/>
                </Link>
                

                <div className={Styles.navbarLinksContainer}>
                    <Link to={"/"} className={Styles.navbarLink}>Home</Link>
                    <Link to={"/clothes"} className={Styles.navbarLink}>Clothes</Link>
                    <Link to={"/cart"}>
                        <LuShoppingCart className={Styles.navbarLink} />
                    </Link>
                    <Link to={"/profile"}>
                        <LuCircleUser className={Styles.navbarLink} />
                    </Link>

                    
                </div>

            </div>

            <div className={Styles.mobileNavbarItems}>
                <Link to={"/"}>
                    <img className={Styles.logo} src="#" alt=""/>
                </Link>

                <div className={Styles.mobileNavbarBtns}>
                    <Link to={"/cart"}>
                        <LuShoppingCart className={Styles.navbarLink} />
                    </Link>
                    <LuMenu className={Styles.navbarLink} onClick={handle_open_menu} />
                </div>
            </div>
                
            <Drawer anchor='right' open={open_menu} onClose={handle_open_menu}>
                <div className={Styles.drawer}>
                    <Link to={"/"} className={Styles.navbarLink}>Home</Link>
                    <Link to={"/clothes"} className={Styles.navbarLink}>Clothes</Link>
                    <Link to={"/profile"} className={Styles.navbarLink}>Profile</Link>
                </div>
                
            </Drawer>
        </nav>
    );
}