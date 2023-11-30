/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import config from '@config/index';

import { Avatar, Button, Dialog } from '@mui/material';
import { formatDate, formatHour } from '@utils/formatDate';
import { acceptAppointment, denyAppointment } from '@pages/Home/actions';
import classes from "./style.module.scss";

const AppointmentCard = ({ appointment }) => {
  const dispatch = useDispatch();

  const [stateAction, setStateAction] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickAccept = () => {
    setOpen(true);
    setStateAction("accept");
  }

  const handleClickDeny = () => {
    setOpen(true);
    setStateAction("deny");
  }

  const handleClose = () => {
    setOpen(false);
    setStateAction("");
  }

  const handleClickYes = () => {
    if (stateAction === 'accept') {
      dispatch(acceptAppointment(appointment.id));
    } else if (stateAction === 'deny') {
      dispatch(denyAppointment(appointment.id));
    }
  }

  return (
    <>
      <div className={classes.card}>
        <div className={classes.leftCard}>
          <div className={classes.cardImage}>
            {appointment.User.image ?
              <img src={`${config.api.host}${appointment.User.image}`} alt='' /> :
              <Avatar className={classes.img} />
            }
          </div>
          <div className={classes.description}>
            <div className={classes.name}>
              {appointment.User.username}
            </div>
            <table>
              <tbody>
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
              </tbody>
            </table>
          </div>
        </div>
        <div className={classes.rightCard}>
          <Button variant='outlined' className={`${classes.accept}`} onClick={handleClickAccept}>
            Accept
          </Button>
          <Button variant='outlined' className={`${classes.deny}`} onClick={handleClickDeny}>
            Deny
          </Button>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <div className={classes.dialog}>
          <div className={classes.content}>
            <h2>Verification</h2>
            <div className={classes.message}>
              {
                stateAction === 'accept' ? 
                  "Do you really want to accept this request?" : 
                  "Do you really want to reject this request?"
              }
            </div>
          </div>
          <div className={classes.buttons}>
            <Button variant="contained" className={classes.cancel} onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              variant='contained' 
              className={`${classes.confirm} ${stateAction === 'accept' ? classes.acceptBtn : classes.denyBtn}`} 
              onClick={handleClickYes}
            >
              Yes
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.object.isRequired,
};

export default AppointmentCard;