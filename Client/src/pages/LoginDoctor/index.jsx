import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { loginDoctor } from '@containers/Client/actions';
import { selectLogin } from '@containers/Client/selectors';

import classes from './style.module.scss';

const LoginDoctor = ({ login }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!user.email) {
      valid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      valid = false;
      newErrors.email = 'Invalid email format';
    }

    if (!user.password) {
      valid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch(loginDoctor(user));
    }
  };

  useEffect(() => {
    if (login) {
      navigate('/');
    }
  }, [login, navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>
          <FormattedMessage id="app_login_doctor" />
        </h1>
        <form>
          <div className={classes.inputItem}>
            <label htmlFor="email">
              <FormattedMessage id="app_email" />
              {errors.email && <p className={classes.error}>{errors.email}</p>}
            </label>
            <input type="text" id="email" name="email" value={user.email} onChange={handleInputChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="password">
              <FormattedMessage id="app_password" />
              {errors.password && <p className={classes.error}>{errors.password}</p>}
            </label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} />
          </div>
          <button className={classes.buttonLogin} onClick={handleLogin}>
            <FormattedMessage id="app_login" />
          </button>
        </form>
        <p>
          <FormattedMessage id="app_dont_have" />
          <Link to="/register/doctor">
            <FormattedMessage id="app_here" />
          </Link>
        </p>
      </div>
    </div>
  );
};

LoginDoctor.propTypes = {
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default connect(mapStateToProps)(LoginDoctor);
