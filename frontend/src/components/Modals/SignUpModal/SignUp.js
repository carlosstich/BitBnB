import './SignUp.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import { setSignupModal } from "../../../store/ui";

export default function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        // Reset
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors([]);
        setDisabled(true);
    }, []);

    useEffect(() => {
        // Enable the button
        if (firstName && lastName && username && email && password && confirmPassword) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [firstName, lastName, username, email, password, confirmPassword]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, lastName, firstName }))
                .then(() => dispatch(setSignupModal(false)))
                .catch(errors => {

                    setErrors(Object.values(errors.errors))
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form className="signupForm" onSubmit={handleSubmit}>
            <div className="signupHeader">
                {/* <img src="/images/x.png" onClick={() => dispatch(setSignupModal(false))} /> */}

            </div>
            <div className="line"></div>
            <div className="loginTitle">Sign Up</div>
            {errors.length > 0 && <ul className="formErrors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>}
            <input
                className="field firstField"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First name"
            />
            <input
                className="field"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last name"
            />
            <input
                className="field"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
            />
            <input
                className="field"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
            />
            <input
                className="field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
            />
            <input
                className="field lastField"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
            />
            <button type="submit" className="signupButton" disabled={disabled}>Sign Up</button>
        </form>
    );
}
