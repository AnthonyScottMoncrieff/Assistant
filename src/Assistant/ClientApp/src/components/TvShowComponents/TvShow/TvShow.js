import React from 'react';
import classes from './TvShow.module.css'
import { toHttps } from '../../../shared/utilities/utilities';

const tvShow = (props) => (
    <div className={classes.TvShow}>
        <div className={classes.TvShowImg} style={{ backgroundImage: `url(${toHttps(props.thumbnailUrl)})` }} />
        <div className={classes.ShowName}>{props.showName.length > 38 ? `${props.showName.substring(0, 38)}...` : props.showName}</div>
        <div className={classes.ShowDescription}>{props.description.length > 200 ? `${props.description.substring(0, 200)}...` : props.description}</div>
    </div>
)

export default tvShow;