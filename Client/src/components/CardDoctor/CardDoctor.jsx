import React from 'react'

import classes from './style.module.scss';
import { formatRupiah } from '@utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import config from '@config/index';

function CardDoctor({ doctors }) {
    const navigate = useNavigate()

    return (
        <div className={classes.card}>
            {
                doctors.map((el) => (
                    <div key={el.id} className={classes.cardList}
                        onClick={() => navigate(`/detail/${el.id}`)}
                    >
                        <img src={`${config.api.host}${el.image}`} alt="" />
                        <div className={classes.data}>
                            <p className={classes.name}>Dr. {el.username}</p>
                            <p className={classes.address}>{el.practiceAt}</p>
                            <p className={classes.price}>{formatRupiah(el.price)}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CardDoctor