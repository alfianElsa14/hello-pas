import doctor from '@static/images/doctor.jpg';
import PropTypes from 'prop-types';
import patient from '@static/images/patient.jpg';
import classes from './style.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectLogin } from '@containers/Client/selectors';
import { useEffect } from 'react';

const Login = ({login}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (login) {
        navigate('/')
    }
}, [login, navigate])
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>Masuk Hellopas</div>
        <div className={classes.subtitle}>Saya ingin masuk sebagai</div>
        <div className={classes.cardContainer}>
          <Link to="/login/patient">
            <div className={classes.cardWrapper}>
              <img src={patient} alt="" />
              <div className={classes.text}>Pasien</div>
            </div>
          </Link>
        </div>
        <div className={classes.cardContainer}>
          <Link to="/login/doctor">
            <div className={classes.cardWrapper}>
              <img src={doctor} alt="" />
              <div className={classes.text}>Doctor</div>
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
  login: selectLogin
})

export default connect(mapStateToProps)(Login);
