/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { formatHour } from '@utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { createAppointment } from '@pages/Detail/actions';
import { FormattedMessage } from 'react-intl';
import classes from "./style.module.scss";

const RequestDialog = ({ open, handleClose, doctorId, availableAppointments }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [inputComplaint, setInputComplaint] = useState("");
  const [availableTimeslots, setAvailableTimeslots] = useState([]);

  const [errors, setErrors] = useState({
    date: "", time: "", complaint: "" 
  });
  const [mainError, setMainError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isDateAvailable = (date) => {
    const dateString = date.toDateString();

    return availableAppointments.some((appointment) => {
      const start = new Date(appointment.startTime);
      return dateString === start.toDateString();
    });
  };

  const validateTime = () => {
    if (!selectedDate) {
      setErrors((prev) => ({...prev, date: "You need to choose date"}));
      return false;
    }

    if (!selectedTime) {
      setErrors((prev) => ({...prev, time: "You need to choose the time"}));
      return false;
    }

    return true;
  }

  const validateComplaint = () => {
    if (!inputComplaint) {
      setErrors((prev) => ({...prev, complaint: "You need to input your complaint"}));
      return false;
    }

    return true;
  }

  const validateInputs = () => {
    const isValidatedTime = validateTime();
    const isValidatedComplaint = validateComplaint();

    if (!isValidatedTime || !isValidatedComplaint)
      return false;

    return true;
  }

  // console.log(availableAppointments, "<< AVAILABLE");
  // console.log(availableTimeslots, "<< TIMESLOTS");

  // console.log(selectedTime, "<< SELECTED TIME");
  // console.log(inputComplaint, "<< COMPLAINT");

  const handleSuccess = () => {
    navigate(`/user/appointment`);
  }

  const handleError = (message) => {
    setMainError(message);
  }

  const handleClickSend = () => {
    setMainError("");
    setErrors({date: "", time: "", complaint: ""});

    // eslint-disable-next-line no-useless-return
    if (!validateInputs()) return;

    const inputs = {
      doctorId,
      complaint: inputComplaint,
      startTime: selectedTime.startTime,
      endTime: selectedTime.endTime,
    };

    dispatch(createAppointment(inputs, handleSuccess, handleError));
  }

  useEffect(() => {
    setSelectedDate(null);
    setSelectedTime("");
    setInputComplaint("");
    setErrors({date: "", time: "", complaint: ""});
    setMainError("");
  }, [open]);

  useEffect(() => {
    setSelectedTime("");
    setErrors((prev) => ({...prev, date: "", time: ""}));
    setMainError("");

    if (selectedDate) {
      setAvailableTimeslots(
        availableAppointments.filter(
          (appointment) => new Date(appointment.startTime).toDateString() === selectedDate.toDateString()
        )
      );
    } else {
      setAvailableTimeslots([]);
    }
  }, [selectedDate]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h2>
            <FormattedMessage id='app_request_appointment' />
          </h2>
          <form>
            <div className={classes.input}>
              <div className={classes.label}>
                <label htmlFor="date">
                  <FormattedMessage id='app_appointment_date' />
                </label>
                {errors.date && (
                  <p className={classes.error}>
                    {errors.date}
                  </p>
                )}
              </div>
              <DatePicker
                placeholderText='Select your date'
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                filterDate={isDateAvailable}
              />
            </div>
            <div className={classes.input}>
              <div className={classes.label}>
                <label htmlFor="time">
                  <FormattedMessage id='app_appointment_time' />
                </label>
                {errors.time && (
                  <p className={classes.error}>
                    {errors.time}
                  </p>
                )}
              </div>
              {/* eslint-disable-next-line no-nested-ternary */}
              {!selectedDate ? (
                  <div className={classes.message}>
                    <FormattedMessage id="app_need_choose_date" />
                  </div>
                ) : (
                  availableTimeslots.length === 0 ? (
                    <div className={classes.message}>
                      <FormattedMessage id="app_no_time_available" />
                    </div>
                  ) : (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" />
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedTime}
                        label=""
                        onChange={(e) => setSelectedTime(e.target.value)}
                      >
                        {availableTimeslots.map((timeslot, idx) => (
                          <MenuItem key={idx} value={timeslot}>
                            {formatHour(timeslot.startTime)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )
                )
              }
            </div>
            <div className={classes.input}>
              <div className={classes.label}>
                <label htmlFor="complaint">
                  <FormattedMessage id="app_complaint" />
                </label>
                {errors.complaint && (
                  <p className={classes.error}>
                    {errors.complaint}
                  </p>
                )}
              </div>
              <textarea 
                type="text" name="complaint" id="complaint" value={inputComplaint} 
                onChange={(e) => setInputComplaint(e.target.value)} 
                rows={3} placeholder='Enter the complaints'
              />
            </div>
          </form>
          {mainError && (<p className={classes.mainError}>{mainError}</p>)}
        </div>
        <div className={classes.buttons}>
          <Button variant="contained" className={classes.cancel} onClick={handleClose}>
            <FormattedMessage id="app_cancel" />
          </Button>
          <Button 
            variant='contained' 
            className={classes.send} onClick={handleClickSend}
          >
            <FormattedMessage id="app_send_request" />
          </Button>
        </div>
      </div>
    </Dialog>
  )
};

RequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  doctorId: PropTypes.number.isRequired,
  availableAppointments: PropTypes.array,
}

export default RequestDialog;
