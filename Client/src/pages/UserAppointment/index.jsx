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
import { editStatusAppointment, getAppointments, midtransPayment } from '@pages/UserAppointment/actions';

import { Avatar, Button } from '@mui/material';
import { formatDate, formatHour } from '@utils/formatDate';
import { selectUser } from '@containers/Client/selectors';

import classes from "./style.module.scss";
import TimeTable from '../../components/TimeTable';

const UserAppointment = ({ user, appointments }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = (appointmentId) => {
    dispatch(midtransPayment(appointmentId, () => {
      console.log('callback');
      dispatch(editStatusAppointment(appointmentId))
    }));
  };

  useEffect(() => {
    if (!user || user.role !== 'user')
      navigate("/");

    if (user && user.id)
      dispatch(getAppointments({ userId: user.id }));
  }, []);
  
  const acceptedFutureAppointments = appointments.filter(
    (appointment) => appointment.status === 'accepted' && new Date(appointment.startTime) > new Date()
  );

  const formattedAppointments = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.Doctor.username,
    startDate: appointment.startTime,
    endDate: appointment.endTime,
    status: appointment.status,
    location: appointment.Doctor.practiceAt,
  }));

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
                      <table>
                        <tr>
                          <td>Hari, Tanggal</td>
                          <td>:{" "}</td>
                          <td>{formatDate(appointment.startTime)}</td>
                        </tr>
                        <tr>
                          <td>Jam</td>
                          <td>:{" "}</td>
                          <td>{formatHour(appointment.startTime)} - {formatHour(appointment.endTime)} WIB</td>
                        </tr>
                        <tr>
                          <td>Keluhan</td>
                          <td>:{" "}</td>
                          <td>{appointment.complaint}</td>
                        </tr>
                        <tr>
                          <td>Biaya</td>
                          <td>:{" "}</td>
                          <td>Rp {appointment.Doctor.price.toLocaleString()}</td>
                        </tr>
                      </table>
                    </div>
                    <Button
                      variant='outlined'
                      className={classes.btn}
                      onClick={() => handleCheckout(appointment.id)}
                    >Bayar</Button>
                  </div>
                ))}
              </div>
            )}
          </>
        </section>
        <section>
          <h2>Appointments</h2>
          <TimeTable appointments={formattedAppointments} />
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
