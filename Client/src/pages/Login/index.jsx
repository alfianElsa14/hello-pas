import doctor from '@static/images/doctor.jpg';
import patient from '@static/images/patient.jpg';
import classes from './style.module.scss';
import { Link } from 'react-router-dom';

const Login = () => {
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

export default Login;
