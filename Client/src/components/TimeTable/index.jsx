/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  // AppointmentTooltip,
  WeekView,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from 'react';

import { formatHour } from '@utils/formatDate';
import classes from "./style.module.scss";

const CustomAppointment = ({ data, children, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      color: '#FFF',
      // eslint-disable-next-line no-nested-ternary
      backgroundColor: data.status === 'paid' ? '#2EF82D' : data.status === 'accepted' ? 'yellow' : 'orange'
    }}
  >
    <div className={classes.appointmentCard}>
      <strong>{data.title}</strong>
      <div>{formatHour(data.startDate)} - {formatHour(data.endDate)} WIB</div>
      <div>{data.status}</div>
    </div>
  </Appointments.Appointment>
);

CustomAppointment.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
}

const TimeTable = ({ appointments }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentDateChange = (date) => setCurrentDate(date);

  return (
    <div>
      <Paper>
        <Scheduler
          data={appointments}
          height={700}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={currentDateChange}
          />
          <WeekView
            startDayHour={8}
            endDayHour={20}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments appointmentComponent={CustomAppointment} />
        </Scheduler>
      </Paper>
    </div>
  )
};

TimeTable.propTypes = {
  appointments: PropTypes.array,
}

export default TimeTable;
