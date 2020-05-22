import React from 'react';
import classes from './TvShow.module.css'

const tvShow = (props) => (
    <div className={classes.TvShow}>
        <img src={props.thumbnailUrl} alt="Thumbnail" />
        <div className={classes.ShowName}>{props.showName}</div>
        <div className="show-description">{props.description}</div>
    </div>
)

export default tvShow;