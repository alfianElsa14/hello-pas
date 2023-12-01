import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectUser } from '@containers/Client/selectors';
import { verifyToken } from './actions';

const Client = ({ login, children, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!login) {
      navigate('/login');
    }
    dispatch(verifyToken(user, navigate));
  }, [login, navigate]);

  return children;
};

Client.propTypes = {
  user: PropTypes.object,
  login: PropTypes.bool,
  children: PropTypes.element,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  user: selectUser,
});

export default connect(mapStateToProps)(Client);
