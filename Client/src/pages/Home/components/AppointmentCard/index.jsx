/* eslint-disable jsx-a11y/control-has-associated-label */
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
import { FormattedMessage } from 'react-intl';
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
                  <td><FormattedMessage id="app_day_date" /></td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>{formatDate(appointment.startTime)}</td>
                </tr>
                <tr>
                  <td><FormattedMessage id="app_hour" /></td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>{formatHour(appointment.startTime)} - {formatHour(appointment.endTime)} WIB</td>
                </tr>
                <tr>
                  <td><FormattedMessage id="app_complaint" /></td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>{appointment.complaint}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={classes.rightCard}>
          <Button variant='outlined' className={`${classes.accept}`} onClick={handleClickAccept}>
            <FormattedMessage id="app_accept" />
          </Button>
          <Button variant='outlined' className={`${classes.deny}`} onClick={handleClickDeny}>
            <FormattedMessage id="app_deny" />
          </Button>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <div className={classes.dialog}>
          <div className={classes.content}>
            <h2>
              <FormattedMessage id='app_verification' />
            </h2>
            <div className={classes.message}>
              {
                stateAction === 'accept' ? 
                  (<FormattedMessage id='app_do_want_accept_request' />) : 
                  (<FormattedMessage id='app_do_want_reject_request' />)
              }
            </div>
          </div>
          <div className={classes.buttons}>
            <Button variant="contained" className={classes.cancel} onClick={handleClose}>
              <FormattedMessage id='app_cancel' />
            </Button>
            <Button 
              variant='contained' 
              className={`${classes.confirm} ${stateAction === 'accept' ? classes.acceptBtn : classes.denyBtn}`} 
              onClick={handleClickYes}
            >
              <FormattedMessage id='app_yes' />
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