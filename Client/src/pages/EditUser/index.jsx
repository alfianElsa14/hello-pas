import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './style.module.scss';
import { selectUserData } from './selector';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRole, selectUser } from '@containers/Client/selectors';
import { editDoctor, editUser, getDoctorById, getUsertById } from './actions';
import { useNavigate } from 'react-router-dom';
import config from '@config/index';
import { FormattedMessage } from 'react-intl';

function EditUser({ userData, user, role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = user.id;

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    image: user.image,
    yearExperience: user.yearExperience,
    practiceAt: user.practiceAt,
    price: user.price,
  });

  const [error, setError] = useState({
    phoneNumber: '',
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    const phoneNumberRegex = /^[0-9\b]+$/;

    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      isValid = false;
      errors.phoneNumber = 'Phone number must be numbers.';
    }

    setError(errors);

    return isValid;
  };

  const { username, email, phoneNumber, image, yearExperience, practiceAt, price } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    setFormData({
      ...formData,
      image: selectedFile,
      imageUrl: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      if (role === 'user') {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('image', image);
        dispatch(editUser(id, formData, navigate));
      } else if (role === 'doctor') {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('image', image);
        formData.append('practiceAt', practiceAt);
        formData.append('price', price);
        dispatch(editDoctor(id, formData, navigate));
      }
    }
  };

  useEffect(() => {
    if (role === 'writer') {
      dispatch(getUsertById(id));
    } else if (role === 'doctor') {
      dispatch(getDoctorById(id));
    }
  }, [id]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>
          <FormattedMessage id="app_edit_profile" />
        </h1>
        <form onSubmit={handleSubmit}>
          <div className={classes.picture}>
            <img src={formData.imageUrl || `${config.api.host}${user.image}`} alt="" />
            <label htmlFor="image" className={classes.customFileButton}>
              <button>
                <FormattedMessage id="app_change" />
              </button>
              <input type="file" id="image" name="image" onChange={handleImageChange} className={classes.fileInput} />
            </label>
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="username">
              <FormattedMessage id="app_username" />
            </label>
            <input type="text" id="username" name="username" value={username} onChange={handleChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="phoneNumber">
              <FormattedMessage id="app_phone_number" />
              {error.phoneNumber && <p className={classes.error}>{error.phoneNumber}</p>}
            </label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={handleChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="email">
              <FormattedMessage id="app_email" />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={classes.readOnly}
              value={email}
              onChange={handleChange}
              readOnly
            />
          </div>
          {role === 'doctor' && (
            <>
              <div className={classes.inputItem}>
                <label htmlFor="yearExperience">
                  <FormattedMessage id="app_year_exp" />
                </label>
                <input
                  type="text"
                  id="yearExperience"
                  name="yearExperience"
                  className={classes.readOnly}
                  value={yearExperience}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className={classes.inputItem}>
                <label htmlFor="practiceAt">
                  <FormattedMessage id="app_practice_at" />
                </label>
                <input type="text" id="practiceAt" name="practiceAt" value={practiceAt} onChange={handleChange} />
              </div>
              <div className={classes.inputItem}>
                <label htmlFor="price">
                  <FormattedMessage id="app_price" />
                </label>
                <input type="number" id="price" name="price" value={price} onChange={handleChange} />
              </div>
            </>
          )}
          <button type="submit" className={classes.buttonRegister}>
            <FormattedMessage id="app_submit" />
          </button>
        </form>
      </div>
    </div>
  );
}

EditUser.propTypes = {
  userData: PropTypes.object,
  user: PropTypes.object,
  role: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userData: selectUserData,
  user: selectUser,
  role: selectRole,
});

export default connect(mapStateToProps)(EditUser);
