import React from 'react';
import classes from './FullTvShow.module.css';
import PropTypes from'prop-types';

const fullTvShow = (props) => (
    <div data-test='FullTvShow' className={classes.FullTvShow}>
        <div data-test='Header' className={classes.Header}>{props.header}</div>
        <div data-test='Body' className={classes.Body}>
            <div data-test='TvShowImg' className={classes.TvShowImg} style={{ backgroundImage: `url(${props.thumbnailUrl})` }} />
            <div data-test='Description' className={classes.Description}>{props.description}</div>
        </div>
    </div>
);

fullTvShow.propTypes = {
    header: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    description: PropTypes.string
}

export default fullTvShow;