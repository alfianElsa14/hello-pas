import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import classes from './style.module.scss';
import { connect, useDispatch } from 'react-redux';
import { changePasswordDoctor, changePasswordUser } from './actions';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectChangePassword } from './selector';
import { selectRole } from '@containers/Client/selectors';
import { FormattedMessage } from 'react-intl';

const ChangePassword = ({ isChange, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [error, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...error, [name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!user.oldPassword.trim()) {
      errors.oldPassword = 'is required';
      isValid = false;
    }

    if (!user.newPassword.trim()) {
      errors.newPassword = 'is required';
      isValid = false;
    } else if (user.newPassword.trim().length < 6) {
      errors.newPassword = 'at least 6 characters';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      if (role === 'user') {
        dispatch(changePasswordUser(user));
      } else if (role === 'doctor') {
        dispatch(changePasswordDoctor(user));
      }
    }
  };

  useEffect(() => {
    if (isChange) {
      navigate('/profile');
    }
  }, [isChange, navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <FormattedMessage id="app_change_password" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputItem}>
            <label htmlFor="oldPassword">
              <FormattedMessage id="app_old_password" />
              {error.oldPassword && <p className={classes.error}>{error.oldPassword}</p>}
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={user.oldPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="newPassword">
              <FormattedMessage id="app_new_password" />
              {error.newPassword && <p className={classes.error}>{error.newPassword}</p>}
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={user.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={classes.buttonLogin}>
            <FormattedMessage id="app_change" />
          </button>
        </form>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  isChange: PropTypes.bool,
  role: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  isChange: selectChangePassword,
  role: selectRole,
});

export default connect(mapStateToProps)(ChangePassword);
