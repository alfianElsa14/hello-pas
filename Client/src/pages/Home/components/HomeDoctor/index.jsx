/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect/es';
import { selectUser } from '@containers/Client/selectors';
import { selectAppointments } from '@pages/Home/selectors';
import { getAppointments } from '@pages/Home/actions';

import thinkingImage from '@static/images/thinking.svg';
import TimeTable from '@components/TimeTable';
import { FormattedMessage } from 'react-intl';
import classes from "./style.module.scss";
import AppointmentCard from '../AppointmentCard';

const HomeDoctor = ({ user, appointments }) => {
  const dispatch = useDispatch();

  const pendingFutureAppointments = appointments.filter(
    (appointment) => appointment.status === 'pending' && new Date(appointment.startTime) > new Date()
  );

  const formattedAppointments = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.User.username,
    startDate: appointment.startTime,
    endDate: appointment.endTime,
    status: appointment.status,
    location: appointment.Doctor.practiceAt,
  }));

  useEffect(() => {
    dispatch(getAppointments({ doctorId: user.id }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h1><FormattedMessage id='app_dashboard' /></h1>
        <section>
          <h2>
            <FormattedMessage id='app_appointment_requests' />
          </h2>
          {pendingFutureAppointments.length === 0 ? (
            <div className={classes.sectionImage}>
              <div className={classes.image}>
                <img src={thinkingImage} alt='Sad' />
              </div>
              <div className={classes.message}>
                <FormattedMessage id='app_no_appointment_requests' />
              </div>
            </div>
          ) : (
            <div className={classes.appointments}>
              {pendingFutureAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          )}
        </section>
        <section>
          <h2>
            <FormattedMessage id='app_appointments' />
          </h2>
          <TimeTable appointments={formattedAppointments} />
        </section>
      </div>
    </main>
  )
}

HomeDoctor.propTypes = {
  user: PropTypes.object,
  appointments: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  appointments: selectAppointments,
});

export default connect(mapStateToProps)(HomeDoctor);