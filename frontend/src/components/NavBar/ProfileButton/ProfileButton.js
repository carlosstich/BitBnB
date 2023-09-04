import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import "./ProfileButton.css";
import DropdownProfile from "./DropDown/DropDownProfile";

export default function ProfileButton({ user }) {
    const [showMenu, setShowMenu] = useState(false);
    const ui = useSelector(state => state.ui);

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => setShowMenu(false);
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <button className="profileButton" onClick={() => setShowMenu(true)}>
            <i className="fas fa-bars"></i>

                <i className="fas fa-user-circle" />
            </button>
            {showMenu && <DropdownProfile ui={ui} user={user} />}
        </>
    );
}
