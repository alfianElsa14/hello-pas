import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss'

const Home = () => {
  const dispatch = useDispatch();

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
        <input type="search"
          placeholder="Cari Dokter"
        />
        <button>
          search
        </button>
      </div>
      <div className={classes.card}>
        <div className={classes.cardList}>
          <img src="https://img.lovepik.com/free-png/20210919/lovepik-doctor-image-display-png-image_400627899_wh1200.png" alt="" />
          <div className={classes.data}>
            <p className={classes.name}>Dr randes</p>
            <p className={classes.address}>Jl. in ajah RT 11 RW 12</p>
            <p className={classes.price}>Rp. 100000</p>
          </div>
        </div>
        <div className={classes.cardList}>
          <img src="https://img.lovepik.com/free-png/20210919/lovepik-doctor-image-display-png-image_400627899_wh1200.png" alt="" />
          <div className={classes.data}>
            <p className={classes.name}>Dr randes</p>
            <p className={classes.address}>Jl. in ajah RT 11 RW 12</p>
            <p className={classes.price}>Rp. 100000</p>
          </div>
        </div>
        <div className={classes.cardList}>
          <img src="https://img.lovepik.com/free-png/20210919/lovepik-doctor-image-display-png-image_400627899_wh1200.png" alt="" />
          <div className={classes.data}>
            <p className={classes.name}>Dr randes</p>
            <p className={classes.address}>Jl. in ajah RT 11 RW 12</p>
            <p className={classes.price}>Rp. 100000</p>
          </div>
        </div>
        <div className={classes.cardList}>
          <img src="https://img.lovepik.com/free-png/20210919/lovepik-doctor-image-display-png-image_400627899_wh1200.png" alt="" />
          <div className={classes.data}>
            <p className={classes.name}>Dr randes</p>
            <p className={classes.address}>Jl. in ajah RT 11 RW 12</p>
            <p className={classes.price}>Rp. 100000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
