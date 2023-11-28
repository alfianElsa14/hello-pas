import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import classes from './style.module.scss'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { selectReviews } from './selector';
import { addReview, deleteReview, getAllReviews } from './actions';
import { calculateTimeDifference } from '@utils/calculateDate';
import DeleteIcon from '@mui/icons-material/Delete';


function Detail({ reviews }) {
    const dispatch = useDispatch();
    const id = 1
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(addReview(id, { comment: newComment }));
        setNewComment('');
    };

    const handleDelete = (reviewId) => {
        dispatch(deleteReview(reviewId))
    } 


    useEffect(() => {
        dispatch(getAllReviews(id))
    }, [id])

    return (
        <div className={classes.detailContainer}>
            <h1>Detail</h1>
            <div className={classes.content}>
                <div className={classes.profileDoc}>
                    <div className={classes.leftSide}>
                        <img src="https://img.lovepik.com/free-png/20210919/lovepik-doctor-image-display-png-image_400627899_wh1200.png" alt="" />
                    </div>
                    <div className={classes.rightSide}>
                        <h2>Agus Sudarsono</h2>
                        <p><strong>Practice Location: </strong> jl.lurah RT 02 RW 03</p>
                        <p><strong>Consultation Price:</strong> Rp.50.000</p>
                        <p><strong>Years of Experience:</strong> 3</p>
                        <div>
                            <p><strong>Email:</strong> agus@gmail.com</p>
                            <p><strong>Contact:</strong> 0811234567890</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.comment}>
                <h4>Reviews</h4>
                {
                    reviews.map((el) => (
                        <div className={classes.commentList}>
                            <div className={classes.userComment}>
                                <div className={classes.picture}>
                                    <img src="https://cdn.idntimes.com/content-images/post/20221104/download-65049cac42b21fd08b36c35ae6eca9ce_600x400.jpeg" alt="" />
                                </div>
                                <div className={classes.isiComment}>
                                    <p className={classes.username}>{el.User.username}</p>
                                    <div className={classes.many}>{el.comment}</div>
                                </div>
                            </div>
                            <div className={classes.date}>
                                <p>{calculateTimeDifference(el.createdAt)}</p>
                            <button><DeleteIcon className={classes.delete}
                            onClick={() => handleDelete(el.id)}
                            /></button>
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
    reviews: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    reviews: selectReviews
});

export default connect(mapStateToProps)(Detail);