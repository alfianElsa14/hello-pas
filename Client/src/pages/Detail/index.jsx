/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { calculateTimeDifference } from '@utils/calculateDate';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectUser } from '@containers/Client/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import { formatRupiah } from '@utils/formatPrice';
import config from '@config/index';
import { Button, IconButton } from '@mui/material';
import { selectAvailableAppointments, selectDoctorById, selectReviews } from './selector';
import { addReview, deleteReview, getAllReviews, getAvailableAppointments, getDoctorById } from './actions';
import classes from './style.module.scss';
import RequestDialog from './components/RequestDialog';

const Detail = ({ reviews, user, doctor, availableAppointments }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = user.id;
  const [newComment, setNewComment] = useState('');
  const [hasMounted, setHasMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickRequestAppointment = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview(id, { comment: newComment }));
    setNewComment('');
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId, id))
  }

  useEffect(() => {
    if (!user || user.role !== 'user') {
      navigate("/");
    } else {
      setHasMounted(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getDoctorById(id));
    dispatch(getAllReviews(id));
    dispatch(getAvailableAppointments(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!hasMounted) return false;

  return (
    <div className={classes.detailContainer}>
      <h1>Detail</h1>
      <div className={classes.content}>
        <div className={classes.profileDoc}>
          <div className={classes.leftSide}>
            <img src={doctor.image} alt="" />
          </div>
          <div className={classes.rightSide}>
            <h2>Dr. {doctor.username}</h2>
            <p><strong>Practice Location: </strong>{doctor.practiceAt}</p>
            <p><strong>Consultation Price:</strong> {formatRupiah(doctor.price)}</p>
            <p><strong>Years of Experience:</strong> {doctor.yearExperience}</p>
            <div>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Contact:</strong> {doctor.phoneNumber}</p>
            </div>
            <div className={classes.janji}>
              <Button variant='contained' className={classes.btn} onClick={handleClickRequestAppointment}>
                Request Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.comment}>
          <h4>Reviews</h4>
          {
            reviews.map((el) => (
              <div key={el.id} className={classes.commentList}>
                <div className={classes.userComment}>
                  <div className={classes.picture}>
                    <img src={`${config.api.host}${el.User.image}`} alt="" />
                  </div>
                  <div className={classes.isiComment}>
                    <p className={classes.username}>{el.User.username}</p>
                    <div className={classes.many}>{el.comment}</div>
                  </div>
                </div>
                <div className={classes.date}>
                  <p>{calculateTimeDifference(el.createdAt)}</p>
                  {
                    userId === el.User.id && (
                      <IconButton onClick={() => handleDelete(el.id)}>
                        <DeleteIcon className={classes.delete}
                        />
                      </IconButton>
                    )
                  }
                </div>
              </div>
            ))
          }
          <form action="" className={classes.formComment} onSubmit={handleCommentSubmit}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} />
            <button type='submit'>Comment</button>
          </form>
      </div>
      <RequestDialog 
        open={open} handleClose={handleClose} 
        doctorId={parseInt(id, 10)} 
        availableAppointments={availableAppointments} 
      />
    </div>
  )
}

Detail.propTypes = {
  reviews: PropTypes.array,
  user: PropTypes.object,
  doctor: PropTypes.object,
  availableAppointments: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  reviews: selectReviews,
  user: selectUser,
  doctor: selectDoctorById,
  availableAppointments: selectAvailableAppointments,
});

export default connect(mapStateToProps)(Detail);