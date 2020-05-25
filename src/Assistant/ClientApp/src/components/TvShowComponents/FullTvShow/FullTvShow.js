import React from 'react';
import classes from './FullTvShow.module.css';

const fullTvShow = (props) => (
    <div className={classes.FullTvShow}>
        <div className={classes.Header}>{props.header}</div>
        <div className={classes.Body}>
            <div className={classes.TvShowImg} style={{backgroundImage: `url(${props.thumbnailUrl})`}} />
            <div className={classes.Description}>{props.description}</div>
        </div>
    </div>
);

export default fullTvShow;