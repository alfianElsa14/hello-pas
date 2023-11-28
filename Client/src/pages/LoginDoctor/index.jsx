import PropTypes from 'prop-types';
import { loginDoctor, loginUser } from '@containers/Client/actions';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '@containers/Client/selectors';
import classes from './style.module.scss';

const LoginDoctor = ({ login }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  console.log(user);
  console.log(login);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginDoctor(user));
  };

  useEffect(() => {
    if (login) {
      navigate('/');
    }
  }, [login, navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>Login Doctor</h1>
        <form>
          <div className={classes.inputItem}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={user.email} onChange={handleInputChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} />
          </div>
          <button className={classes.buttonLogin} onClick={handleLogin}>
            Login
          </button>
          {/* {error && <p className={classes.error}>{error}</p>} */}
        </form>
        <p>
          Don't have an account? klik <Link to="/register/doctor">here</Link>
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
