import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/session';
import "./DropDownProfile"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';



export default function DropdownLoggedIn({ user }) {
    const dispatch = useDispatch();

    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout());
        history.push('/')
    }
    return <>
        <div className="dropdownInfo">Hello, {user.firstName}!</div>
        {/* <div className="dropdownInfo">{user.username}</div> */}
        <div className="dropdownInfo">{user.email}</div>
        {/* <div className="dropdownInfo">Manage Spots</div> */}
        <Link to="/current" className="dropdownInfo"> Manage Spots</Link>
        <div className="dropdownButton bold" onClick={handleLogout}>Log Out</div>
    </>
}
