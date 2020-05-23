import React from 'react';
import classes from './Episode.module.css';

const episode = (props) => (
    <div className={classes.Episode}>
        <img src={props.episode.image.medium} alt="Thumbnail" />
        <div>{props.episode.name}</div>
        <div>{props.episode.airdate}</div>
    </div>
)

export default episode;