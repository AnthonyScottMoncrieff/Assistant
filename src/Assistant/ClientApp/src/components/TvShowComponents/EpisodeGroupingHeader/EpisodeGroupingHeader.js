import React from 'react';
import classes from './EpisodeGroupingHeader.module.css';

const episodeGroupingHeader = () => {
    return (
    <div className={classes.HeadersSection}>
        <div className={classes.EpisodeImage}>Image</div>
        <div className={classes.EpisodeName}>Name</div>
        <div className={classes.EpisodeNumber}>Number</div>
        <div className={classes.EpisodeReleaseDate}>Release Date</div>
    </div>)
}

export default episodeGroupingHeader;