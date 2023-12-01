import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';
import CardDoctor from '@components/CardDoctor/CardDoctor';
import { createStructuredSelector } from 'reselect';
import { getAllDoctors } from '@pages/Home/actions';
import { selectDoctors } from '@pages/Home/selectors';
function HomeUser({ doctors }) {
  const dispatch = useDispatch();
  console.log(doctors, '<<< doc');

  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);
  return (
    <div className={classes.container}>
      <h1>Janji temu dokter</h1>
      <div className={classes.banner}>
        <h3>Buat janji mudah & bebas antri</h3>
        <div className={classes.contentHeader}>
          <div className={classes.iconList}>
            <img src="https://www.halodoc.com/assets/img/hospital/webp/find_doctor.webp" alt="" />
            <p>Daftar Dokter</p>
          </div>
          <div className={classes.iconList}>
            <img src="https://www.halodoc.com/assets/img/hospital/webp/come-hospital.webp" alt="" />
            <p>Tanpa Antri</p>
          </div>
          <div className={classes.iconList}>
            <img src="https://www.halodoc.com/assets/img/hospital/webp/get-consult.webp" alt="" />
            <p>Atur jadwal</p>
          </div>
        </div>
      </div>
      <div className={classes.search}>
        <input type="search" placeholder="Cari Dokter" />
        <button>search</button>
      </div>
      <CardDoctor doctors={doctors} />
    </div>
  );
}

HomeUser.propTypes = {
  doctors: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  doctors: selectDoctors,
});

export default connect(mapStateToProps)(HomeUser);
