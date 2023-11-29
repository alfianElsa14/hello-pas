import PropTypes from 'prop-types';
import classes from './style.module.scss';
import { selectDoctorProfile, selectUserProfile } from './selector';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDoctorProfile, getUserProfile } from './actions';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectRole } from '@containers/Client/selectors';

const Profile = ({ userProfile, role, doctorProfile }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === 'user') {
      dispatch(getUserProfile());
    } else if (role === 'doctor') {
      dispatch(getDoctorProfile());
    }
  }, [role, dispatch]);

  const getProfileContent = () => {
    switch (role) {
      case 'user':
        return (
          <div className={classes.container}>
            <div className={classes.profileWrapper}>
              <div>
                {userProfile?.image ? (
                  <img src={userProfile.image} alt="Profile" className={classes.img} />
                ) : (
                  <Avatar className={classes.img} />
                )}
              </div>
              <div className={classes.name}>{userProfile?.username}</div>
              <div className={classes.email}>{userProfile?.email}</div>
              <div className={classes.phoneNumber}>{userProfile?.phoneNumber}</div>
              <Link to="/edit">
                <button>Edit Profile</button>
              </Link>
              <Link to="/change-password">
                <button>Change Password</button>
              </Link>
            </div>
          </div>
        );
      case 'doctor':
        return (
          <div className={classes.container}>
            <div className={classes.profileWrapper}>
              <div>
                {doctorProfile?.image ? (
                  <img src={doctorProfile.image} alt="Profile" className={classes.img} />
                ) : (
                  <Avatar className={classes.img} />
                )}
              </div>
              <div className={classes.name}>{doctorProfile?.username}</div>
              <div className={classes.email}>{doctorProfile?.email}</div>
              <div className={classes.phoneNumber}>{doctorProfile?.phoneNumber}</div>
              <Link to="/edit">
                <button>Edit Profile</button>
              </Link>
              <Link to="/change-password">
                <button>Change Password</button>
              </Link>
            </div>
            <div className={classes.reviews}>Reviews</div>
            <div className={classes.cardContainer}>
              {doctorProfile &&
                doctorProfile.Reviews &&
                doctorProfile.Reviews.map((review, index) => (
                  <div key={index} className={classes.cardWrapper}>
                    {review.User.image ? (
                      <img src={review.User.image} alt="User Avatar" />
                    ) : (
                      <Avatar className={classes.img} />
                    )}
                    <div className={classes.content}>
                      <div className={classes.commentName}>{review.User.username}</div>
                      <div className={classes.commentField}>"{review.comment}"</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
    }
  };

  return getProfileContent();
};

Profile.propTypes = {
  userProfile: PropTypes.object,
  doctorProfile: PropTypes.object,
  role: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userProfile: selectUserProfile,
  doctorProfile: selectDoctorProfile,
  role: selectRole,
});

export default connect(mapStateToProps)(Profile);
