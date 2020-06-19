import React from 'react';
import classes from './EpisodeGroupingHeader.module.css';

const episodeGroupingHeader = () => {
    return (
        <div data-test='HeadersSection' className={classes.HeadersSection}>
            <div data-test='EpisodeImage' className={classes.EpisodeImage}>Image</div>
            <div data-test='EpisodeName' className={classes.EpisodeName}>Name</div>
            <div data-test='EpisodeNumber' className={classes.EpisodeNumber}>Number</div>
            <div data-test='EpisodeReleaseDate' className={classes.EpisodeReleaseDate}>Release Date</div>
        </div>)
}

export default episodeGroupingHeader;