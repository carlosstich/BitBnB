import LoginFormModal from './LoginFormModal/LoginFormModal';
import SignupFormModal from './SignUpModal/SignUpModal';
import { useSelector } from 'react-redux';
import ReviewFormModal from './ReviewFormModal/ReviewFormModal';
import DeleteSpotForm from './DeleteSpot/DeleteSpot';

export default function Modals() {
    const ui = useSelector(state => state.ui);
    return <>
        {ui.showLoginModal && <LoginFormModal />}
        {ui.showSignupModal && <SignupFormModal />}
        {ui.showReviewModal && <ReviewFormModal />}
        {ui.showDeleteSpotModal && <DeleteSpotForm />}
    </>
}
