/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import paidOffImage from '@static/images/paid-off.png';

import config from '@config/index';
import { selectAppointments } from '@pages/UserAppointment/selectors';
import { getAppointments } from '@pages/UserAppointment/actions';

import { Avatar, Button } from '@mui/material';
import { formatDate, formatHour } from '@utils/formatDate';
import { selectUser } from '@containers/Client/selectors';

import classes from "./style.module.scss";

const UserAppointment = ({ user, appointments }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id)
      dispatch(getAppointments({ userId: user.id }));
  }, []);

  console.log(appointments, "<< APPOINTMENTS");
  const acceptedFutureAppointments = appointments.filter(
    (appointment) => appointment.status === 'accepted' && new Date(appointment.startTime) > new Date()
  );
  console.log(acceptedFutureAppointments, "<< ACCEPTED APPOINTMENTS");

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h1>My Appointments</h1>
        <section>
          <h2>Accepted Appointments</h2>
          <>
            {acceptedFutureAppointments.length === 0 ? (
              <div className={classes.image}>
                <img src={paidOffImage} alt='' />
              </div>
            ) : (
              <div className={classes.acceptedAppointments}>
                {acceptedFutureAppointments.map((appointment) => (
                  <div key={appointment.id} className={classes.card}>
                    <div className={classes.leftCard}>
                      <div className={classes.cardImage}>
                        {appointment.Doctor.image ? 
                          <img src={`${config.api.host}${appointment.Doctor.image}`} alt='' /> :
                          <Avatar className={classes.img} />
                        }
                      </div>
                      <div className={classes.description}>
                        <div className={classes.name}>
                          {appointment.Doctor.username}
                        </div>
                        <div className={classes.scheduleDay}>
                          Hari, Tanggal: {formatDate(appointment.startTime)}
                        </div>
                        <div className={classes.scheduleHour}>
                          Jam: {formatHour(appointment.startTime)} - {formatHour(appointment.endTime)} WIB
                        </div>
                        <div className={classes.complaint}>
                          Keluhan: {appointment.complaint}
                        </div>
                      </div>
                    </div>
                    <Button variant='outlined' className={classes.btn}>Bayar</Button>
                  </div>
                ))}
              </div>
            )}
          </>
        </section>
        <section>
          <h2>Appointments</h2>
          <div className={classes.acceptedAppointments}>
            {/* TODO: Create the calendar */}
            TBD dulu, taruh beginian dulu
            {appointments.map((appointment) => (
              <div key={appointment.id} className={classes.card}>
              <div className={classes.leftCard}>
                <div className={classes.cardImage}>
                  {appointment.Doctor.image ? 
                    <img src={`${config.api.host}${appointment.Doctor.image}`} alt='' /> :
                    <Avatar className={classes.img} />
                  }
                </div>
                <div className={classes.description}>
                  <div className={classes.name}>
                    {appointment.Doctor.username}
                  </div>
                  <div className={classes.scheduleDay}>
                    Hari, Tanggal: {formatDate(appointment.startTime)}
                  </div>
                  <div className={classes.scheduleHour}>
                    Jam: {formatHour(appointment.startTime)} - {formatHour(appointment.endTime)} WIB
                  </div>
                  <div className={classes.complaint}>
                    Keluhan: {appointment.complaint}
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

UserAppointment.propTypes = {
  user: PropTypes.object,
  appointments: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  appointments: selectAppointments,
});

export default connect(mapStateToProps)(UserAppointment);
