import React from 'react';
import classes from './TvShow.module.css'

const tvShow = (props) => (
    <div className={classes.TvShow}>
        <div className={classes.TvShowImg} style={{backgroundImage: `url(${props.thumbnailUrl})`}} />
        <div className={classes.ShowName}>{props.showName}</div>
        <div className="show-description">{props.description.length > 322 ? `${props.description.substring(0, 322)}...` : props.description }</div>
    </div>
)

export default tvShow;