import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import classes from './style.module.scss';
import { connect, useDispatch } from 'react-redux';
import { changePasswordDoctor, changePasswordUser } from './actions';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectChangePassword } from './selector';
import { selectRole } from '@containers/Client/selectors';

const ChangePassword = ({ isChange, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'user') {
      dispatch(changePasswordUser(user));
    } else if (role === 'doctor') {
      dispatch(changePasswordDoctor(user));
    }
  };

  useEffect(() => {
    if (isChange) {
      navigate('/profile');
    }
  }, [isChange, navigate]);
  console.log(isChange);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div>Change Password</div>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputItem}>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={user.oldPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={user.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={classes.buttonLogin}>
            Change
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
