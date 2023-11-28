import doctor from '@static/images/doctor.png';
import patient from '@static/images/patient.png';
import classes from './style.module.scss';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Login = () => {
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

export default Login;
