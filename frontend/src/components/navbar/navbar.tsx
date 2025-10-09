import { LuCircleUser, LuMenu, LuShoppingCart } from 'react-icons/lu';
import Styles from './navbar.module.css'
import { Drawer } from '@mui/material';
import { useState } from 'react';

export default function Navbar() {
    const [open_menu, set_open_menu] = useState(false);

    const handle_open_menu = () => {
        set_open_menu(!open_menu);
    }

    return (
        <nav className={Styles.navbarContainer}>
            <div className={Styles.navbarItems}>
                <img className={Styles.logo} src="#" alt=""/>

                <div className={Styles.navbarLinksContainer}>
                    <a href="#" className={Styles.navbarLink}>Home</a>
                    <a href="#" className={Styles.navbarLink}>Clothes</a>
                    <LuShoppingCart className={Styles.navbarLink} />
                    <LuCircleUser className={Styles.navbarLink} />
                </div>

            </div>

            <div className={Styles.mobileNavbarItems}>
                <img className={Styles.logo} src="#" alt=""/>

                <div className={Styles.mobileNavbarBtns}>
                    <LuShoppingCart className={Styles.navbarLink} />
                    <LuMenu className={Styles.navbarLink} onClick={handle_open_menu} />
                </div>
            </div>
                
            <Drawer anchor='right' open={open_menu} onClose={handle_open_menu}>
                <div className={Styles.drawer}>
                    <a href="#" className={Styles.navbarLink}>Home</a>
                    <a href="#" className={Styles.navbarLink}>Clothes</a>
                    <a href="#" className={Styles.navbarLink}>Profile</a>
                </div>
                
            </Drawer>
        </nav>
    );
}