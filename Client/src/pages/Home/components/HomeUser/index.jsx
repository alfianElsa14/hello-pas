import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import CardDoctor from '@components/CardDoctor/CardDoctor';
import { getAllDoctors } from '@pages/Home/actions';
import { selectDoctors } from '@pages/Home/selectors';

import classes from './style.module.scss';

function HomeUser({ doctors }) {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        dispatch(getAllDoctors())
    }, [])

    console.log(doctors, "<<<<");
    return (
        <div className={classes.container}>
            <h1><FormattedMessage id="app_doctor_list"/></h1>
            <div className={classes.banner}>
                <h3><FormattedMessage id="app_queue_free"/></h3>
                <div className={classes.contentHeader}>
                    <div className={classes.iconList}>
                        <img src="https://www.halodoc.com/assets/img/hospital/webp/find_doctor.webp" alt="" />
                        <p><FormattedMessage id="app_doctor_list"/></p>
                    </div>
                    <div className={classes.iconList}>
                        <img src="https://www.halodoc.com/assets/img/hospital/webp/come-hospital.webp" alt="" />
                        <p><FormattedMessage id="app_without_queuing"/></p>
                    </div>
                    <div className={classes.iconList}>
                        <img src="https://www.halodoc.com/assets/img/hospital/webp/get-consult.webp" alt="" />
                        <p><FormattedMessage id="app_set_schedule"/></p>
                    </div>
                </div>
            </div>
            <div className={classes.search}>
                <input
                    type="search"
                    placeholder="Search Dokter . . ."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <CardDoctor doctors={filteredDoctors} />
        </div>
    )
}

HomeUser.propTypes = {
    doctors: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
    doctors: selectDoctors,
});

export default connect(mapStateToProps)(HomeUser);