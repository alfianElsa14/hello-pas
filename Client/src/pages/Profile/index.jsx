import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import { selectDoctorProfile, selectUserProfile } from './selector';
import { getDoctorProfile, getUserProfile } from './actions';
import config from '@config/index';
import { selectRole } from '@containers/Client/selectors';

import { Avatar } from '@mui/material';
import classes from './style.module.scss';

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
                  <img src={`${config.api.host}${userProfile.image}`} alt="Profile" className={classes.img} />
                ) : (
                  <Avatar className={classes.img} />
                )}
              </div>
              <div className={classes.name}>{userProfile?.username}</div>
              <div className={classes.email}>{userProfile?.email}</div>
              <div className={classes.phoneNumber}>{userProfile?.phoneNumber}</div>
              <Link to="/edit">
                <button>
                  <FormattedMessage id="app_edit_profile" />
                </button>
              </Link>
              <Link to="/change-password">
                <button>
                  <FormattedMessage id="app_change_password" />
                </button>
              </Link>
            </div>
          </div>
        );
      case 'doctor':
        const hasReviews = doctorProfile && doctorProfile.Reviews && doctorProfile.Reviews.length > 0;
        return (
          <div className={classes.container}>
            <div className={classes.profileWrapper}>
              <div>
                {doctorProfile?.image ? (
                  <img src={`${config.api.host}${doctorProfile.image}`} alt="Profile" className={classes.img} />
                ) : (
                  <Avatar className={classes.img} />
                )}
              </div>
              <div className={classes.name}>{doctorProfile?.username}</div>
              <div className={classes.email}>{doctorProfile?.email}</div>
              <div className={classes.phoneNumber}>{doctorProfile?.phoneNumber}</div>
              <Link to="/edit">
                <button>
                  <FormattedMessage id="app_edit_profile" />
                </button>
              </Link>
              <Link to="/change-password">
                <button>
                  <FormattedMessage id="app_change_password" />
                </button>
              </Link>
            </div>
            {hasReviews && (
              <div className={classes.reviews}>
                <FormattedMessage id="app_reviews" />
              </div>
            )}
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
