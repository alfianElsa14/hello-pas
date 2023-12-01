import { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import doctor from '@static/images/doctor.png';
import patient from '@static/images/patient.png';
import { selectLogin } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Login = ({ login }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      navigate('/');
    }
  }, [login, navigate]);
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <FormattedMessage id="app_login_hellopas" />
        </div>
        <div className={classes.subtitle}>
          <FormattedMessage id="app_login_as" />
        </div>
        <div className={classes.cardContainer}>
          <Link to="/login/patient">
            <div className={classes.cardWrapper}>
              <img src={patient} alt="" />
              <div className={classes.text}>
                <FormattedMessage id="app_patient" />
              </div>
            </div>
          </Link>
        </div>
        <div className={classes.cardContainer}>
          <Link to="/login/doctor">
            <div className={classes.cardWrapper}>
              <img src={doctor} alt="" />
              <div className={classes.text}>
                <FormattedMessage id="app_doctor" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default connect(mapStateToProps)(Login);
