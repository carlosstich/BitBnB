import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSpotModal } from '../../../store/ui';
import ProfileButton from '../ProfileButton/ProfileButton';
import "./RightHeader.css"

export default function RightHeader() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <span>
      <div className="rightHeader">
        {sessionUser && (
          <button
            className="createASpot button"
            onClick={() => {
              dispatch(setSpotModal(true));
              history.push('/spots/new');
            }}
          >
            Create a Spot
          </button>
        )}
        <ProfileButton user={sessionUser} />
      </div>
    </span>
  );
}
