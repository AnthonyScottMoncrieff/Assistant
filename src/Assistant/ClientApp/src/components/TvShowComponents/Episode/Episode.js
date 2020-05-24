import React from 'react';
import classes from './Episode.module.css';
import { toBritishDate } from '../../../shared/utilities/utilities';

const episode = (props) => {
    let imgSrc = props.shouldLoadImg ? props.episode.image.medium : "";
    return (
        <div className={classes.Episode}>
            <div className={classes.ImageContainer}>
                <img src={imgSrc} alt="Thumbnail" />
            </div>
            <div className={classes.Name}>{props.episode.name}</div>
            <div className={classes.Number}>{props.episode.number}</div>
            <div className={classes.Date}>{toBritishDate(props.episode.airdate)}</div>
        </div>)
}

export default episode;