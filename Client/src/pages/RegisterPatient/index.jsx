import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import classes from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { register, resetRegisterStatus } from './actions';
import { createStructuredSelector } from 'reselect';
import { selectRegisterSucces } from './selector';
import { FormattedMessage } from 'react-intl';

const RegisterPatient = ({ isSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
    };

    if (!inputs.username) {
      valid = false;
      newErrors.username = 'Username is required';
    }

    if (!inputs.email) {
      valid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      valid = false;
      newErrors.email = 'Invalid email format';
    }

    if (!inputs.password) {
      valid = false;
      newErrors.password = 'Password is required';
    } else if (inputs.password.length < 6) {
      valid = false;
      newErrors.password = 'Password should be at least 6 characters long';
    }

    if (!inputs.phoneNumber) {
      valid = false;
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d+$/.test(inputs.phoneNumber)) {
      valid = false;
      newErrors.phoneNumber = 'Should contain only numbers';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      dispatch(register(inputs));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login/patient');
      dispatch(resetRegisterStatus());
    }
  }, [isSuccess, dispatch, navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>
          <FormattedMessage id="app_register_patient" />
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div className={classes.inputItem}>
            <label htmlFor="username">
              <FormattedMessage id="app_username" />
              {errors.username && <p className={classes.error}>{errors.username}</p>}
            </label>
            <input id="username" name="username" type="text" value={inputs.username} onChange={handleInputChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="email">
              <FormattedMessage id="app_email" />
              {errors.email && <p className={classes.error}>{errors.email}</p>}
            </label>
            <input id="email" name="email" type="text" value={inputs.email} onChange={handleInputChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="password">
              <FormattedMessage id="app_password" />
              {errors.password && <p className={classes.error}>{errors.password}</p>}
            </label>
            <input id="password" name="password" type="password" value={inputs.password} onChange={handleInputChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="phoneNumber">
              <FormattedMessage id="app_phone_number" />
              {errors.phoneNumber && <p className={classes.error}>{errors.phoneNumber}</p>}
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={inputs.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={classes.buttonRegister}>
            <FormattedMessage id="app_register" />
          </button>
        </form>
      </div>
    </div>
  );
};

RegisterPatient.propTypes = {
  isSuccess: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isSuccess: selectRegisterSucces,
});

export default connect(mapStateToProps)(RegisterPatient);
