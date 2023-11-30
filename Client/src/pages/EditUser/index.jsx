import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classes from './style.module.scss';
import { selectUserData } from './selector';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '@containers/Client/selectors';
import { editUser, getUsertById } from './actions';
import { useNavigate } from 'react-router-dom';
import config from '@config/index';

function EditUser({ userData, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = user.id;

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    image: null,
  });

  const { username, email, phoneNumber, image } = formData;

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

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('image', image);

    dispatch(editUser(id, formData));
    navigate('/profile');
  };

  useEffect(() => {
    dispatch(getUsertById(id));
  }, [id]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className={classes.picture}>
            <img src={formData.imageUrl || `${config.api.host}${userData.image}`} alt="" />
            <label htmlFor="image" className={classes.customFileButton}>
              <button>Change</button>
              <input type="file" id="image" name="image" onChange={handleImageChange} className={classes.fileInput} />
            </label>
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={handleChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={handleChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="number" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={handleChange} />
          </div>
          <button type="submit" className={classes.buttonRegister}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

EditUser.propTypes = {
  userData: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userData: selectUserData,
  user: selectUser,
});

export default connect(mapStateToProps)(EditUser);
