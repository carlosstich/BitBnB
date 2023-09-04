import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import { setLoginModal } from '../../../store/ui';
import './LoginModal.css';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setCredential('');
        setPassword('');
        setErrors([]);
        setDisabled(true);
    }, []);

    useEffect(() => {

        if (credential.length >= 4 && password.length >= 6) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [credential, password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => {
                dispatch(setLoginModal(false));
            })
            .catch((error) => {
                setErrors(['The provided credentials were invalid.']);
            });
    };

    return (
        <form className="loginForm" onSubmit={handleSubmit}>
            <div className="logInHeader">
                {/* <img className="closeIcon" src="/images/x.png" alt="Close button" onClick={() => dispatch(setLoginModal(false))} /> */}

            </div>
            <div className="line"></div>
            <div className="loginTitle">Login to BitBnB</div>
            {errors.length > 0 && (
                <div className="formErrors">
                    {errors.map((error, idx) => (
                        <div key={idx} style={{ color: 'red' }}>
                            {error}
                        </div>
                    ))}
                </div>
            )}
            <input
                className="field firstField"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder="Username or email"
                required
            />
            <input
                className="field lastField"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button
                type="submit"
                className="demoButton"
                onClick={() => {
                    setCredential('Demo-lition');
                    setPassword('password');
                }}
            >
                Log in as demo user
            </button>
            <button type="submit" className="loginButton" disabled={disabled}>
                Continue
            </button>
        </form>
    );
}

export default LoginForm;
