import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './TopBar.css';
import Logo from './Logo';
import RightHeader from './RightHeader/RightHeader'

export default function Header({ className }) {
    const ui = useSelector(state => state.ui);
    const history = useHistory();
    
    return (
        <div className="headerWrapper" style={{ position: ui.headerPosition }}>
            <div className={className}>
                <div className="header">
                    <Logo />
                    <RightHeader />
                </div>
            </div>
            {className && <div className="line"></div>}
        </div >
    );
}
