/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUser } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import HomeUser from './components/HomeUser';
import HomeDoctor from './components/HomeDoctor';

const Home = ({ user }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (user)
      setHasMounted(true);
  }, [user])

  if (!hasMounted) return null;

  return (
    <>
      {(() => {
        switch (user.role) {
          case "user":
            return <HomeUser />;
          case "doctor":
            return <HomeDoctor />;
        }
      })()}
    </>
  );
};

Home.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(Home);
