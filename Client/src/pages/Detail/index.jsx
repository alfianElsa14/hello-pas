import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectDoctorById, selectReviews } from './selector';
import { addReview, deleteReview, getAllReviews, getDoctorById } from './actions';
import { calculateTimeDifference } from '@utils/calculateDate';
import { selectUser } from '@containers/Client/selectors';
import { formatRupiah } from '@utils/formatPrice';
import config from '@config/index';

import DeleteIcon from '@mui/icons-material/Delete';
import classes from './style.module.scss'

function Detail({ reviews, user, doctor }) {
    const dispatch = useDispatch();
    const { id } = useParams()
    const userId = user.id
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(addReview(id, { comment: newComment }));
        setNewComment('');
    };

    const handleDelete = (reviewId) => {
        dispatch(deleteReview(reviewId, id))
    }

    useEffect(() => {
        dispatch(getDoctorById(id))
        dispatch(getAllReviews(id))
    }, [id])

    return (
        <div className={classes.detailContainer}>
            <h1>Detail</h1>
            <div className={classes.content}>
                <div className={classes.profileDoc}>
                    <div className={classes.leftSide}>
                        <img src={`${config.api.host}${doctor.image}`} alt="" />
                    </div>
                    <div className={classes.rightSide}>
                        <h2>Dr. {doctor.username}</h2>
                        <p><strong><FormattedMessage id="app_practice_location"/>: </strong>{doctor.practiceAt}</p>
                        <p><strong><FormattedMessage id="app_consul_price"/>:</strong> {formatRupiah(doctor.price)}</p>
                        <p><strong><FormattedMessage id="app_year_exp"/>:</strong> {doctor.yearExperience} <FormattedMessage id="app_year"/></p>
                        <div>
                            <p><strong>Email:</strong> {doctor.email}</p>
                            <p><strong>Contact:</strong> {doctor.phoneNumber}</p>
                        </div>
                        <div className={classes.janji}>
                            <button><FormattedMessage id="app_make_appointment"/></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.comment}>
                <h4><FormattedMessage id="app_reviews"/></h4>
                {
                    reviews.map((el) => (
                        <div className={classes.commentList}>
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
                                        <button><DeleteIcon className={classes.delete}
                                            onClick={() => handleDelete(el.id)}
                                        /></button>
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
                        onChange={(e) => setNewComment(e.target.value)}></textarea>
                    <button type='submit'>Comment</button>
                </form>
            </div>
        </div>
    )
}

Detail.propTypes = {
    reviews: PropTypes.array,
    user: PropTypes.object,
    doctor: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    reviews: selectReviews,
    user: selectUser,
    doctor: selectDoctorById
});

export default connect(mapStateToProps)(Detail);