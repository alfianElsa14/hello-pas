import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import classes from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { register, resetRegisterStatus } from './actions';
import { selectRegisterDoctorSucces } from './selector';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

const RegisterDoctor = ({ isSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    yearExperience: '',
    practiceAt: '',
    price: '',
    image: null,
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    yearExperience: '',
    practiceAt: '',
    price: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setInputs({ ...inputs, [name]: e.target.files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      yearExperience: '',
      practiceAt: '',
      price: '',
      image: '',
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

    if (!inputs.yearExperience) {
      valid = false;
      newErrors.yearExperience = 'Year Experience is required';
    }

    if (!inputs.practiceAt) {
      valid = false;
      newErrors.practiceAt = 'Practice At is required';
    }

    if (!inputs.price) {
      valid = false;
      newErrors.price = 'Price is required';
    }

    if (!inputs.image) {
      valid = false;
      newErrors.image = 'Photo is required';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      const formData = new FormData();

      Object.keys(inputs).forEach((key) => {
        formData.append(key, inputs[key]);
      });

      dispatch(register(formData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login/doctor');
      dispatch(resetRegisterStatus());
    }
  }, [isSuccess, dispatch, navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>
          <FormattedMessage id="app_register_doctor" />
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
          <div className={classes.inputItem}>
            <label htmlFor="yearExperience">
              <FormattedMessage id="app_year_exp" />
              {errors.yearExperience && <p className={classes.error}>{errors.yearExperience}</p>}
            </label>
            <input
              id="yearExperience"
              name="yearExperience"
              type="number"
              value={inputs.yearExperience}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="practiceAt">
              <FormattedMessage id="app_practice_at" />
              {errors.practiceAt && <p className={classes.error}>{errors.practiceAt}</p>}
            </label>
            <input
              id="practiceAt"
              name="practiceAt"
              type="text"
              value={inputs.practiceAt}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="price">
              <FormattedMessage id="app_price" />
              {errors.price && <p className={classes.error}>{errors.price}</p>}
            </label>
            <input id="price" name="price" type="text" value={inputs.price} onChange={handleInputChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="image">
              Photo Doctor
              {errors.image && <p className={classes.error}>{errors.image}</p>}
            </label>
            <input id="image" name="image" type="file" accept="image/*" onChange={handleInputChange} />
          </div>
          <button type="submit" className={classes.buttonRegister}>
            <FormattedMessage id="app_register" />
          </button>
        </form>
      </div>
    </div>
  );
};

RegisterDoctor.propTypes = {
  isSuccess: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isSuccess: selectRegisterDoctorSucces,
});

export default connect(mapStateToProps)(RegisterDoctor);
