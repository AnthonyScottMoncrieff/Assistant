import React from 'react';
import classes from './Episode.module.css';
import { toBritishDate, isDateInFuture } from '../../../shared/utilities/utilities';

const episode = (props) => {
    let imgSrc = props.shouldLoadImg && props.episode.image ? props.episode.image.medium : "/noimg.png";
    let EpisodeClasses = isDateInFuture(new Date(props.episode.airdate)) ? [classes.Episode, classes.FutureEpisode].join(" ") : [classes.Episode, classes.EpisodeHighlight].join(" ")
    return (
        <div className={EpisodeClasses}>
            <div className={classes.ImageContainer}>
                <div className={classes.EpisodeImg} style={{ backgroundImage: `url(${imgSrc})` }} />
            </div>
            <div className={classes.Name}>{props.episode.name}</div>
            <div className={classes.Number}>{props.episode.number}</div>
            <div className={classes.Date}>{toBritishDate(props.episode.airdate)}</div>
        </div>)
}

export default episode;