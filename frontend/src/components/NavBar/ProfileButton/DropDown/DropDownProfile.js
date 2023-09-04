import "./DropDownProfile.css";
import DropdownLoggedIn from "./DropdownLoggedIn";
import DropdownLoggedOut from "./DropdownLoggedOut";

export default function DropdownProfile({ user, ui }) {
    const marginRightValue = ui && ui.padding && ui.padding.right
                             ? (+ui.padding.right.split('px')[0] - 66) + "px"
                             : "0px";

    return (
        <>
            <div
                className={"profile-dropdown"}
                style={{ marginRight: marginRightValue }}
            >
                {user ? <DropdownLoggedIn user={user} /> : <DropdownLoggedOut />}
            </div>
        </>
    );
}
