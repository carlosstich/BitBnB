import { useDispatch } from 'react-redux';
import { setLoginModal, setSignupModal } from '../../../../store/ui';

export default function DropdownLoggedOut() {
    const dispatch = useDispatch();
    return <>
        <div className="dropdownButton bold" onClick={() => dispatch(setLoginModal(true))}>Log In</div>
        <div className="dropdownButton" onClick={() => dispatch(setSignupModal(true))}>Sign up</div>
    </>
}
