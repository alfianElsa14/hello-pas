import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getAllDoctors } from './actions';
import HomeUser from './components/HomeUser';

const Home = () => {

  return (
    <HomeUser />
  );
};


export default Home
