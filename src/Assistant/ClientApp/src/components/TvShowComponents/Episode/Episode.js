import React from 'react';
import classes from './Episode.module.css';
import { toBritishDate, isDateInFuture, toHttps } from '../../../shared/utilities/utilities';
import NoImage from '../../../Assets/Images/noimg.png';
import PropTypes from'prop-types';

const episode = (props) => {
    let imgSrc = props.shouldLoadImg && props.episode.image ? toHttps(props.episode.image.medium) : NoImage;
    let EpisodeClasses = isDateInFuture(new Date(props.episode.airdate)) ? [classes.Episode, classes.FutureEpisode].join(" ") : [classes.Episode, classes.EpisodeHighlight].join(" ")
    return (
        <div data-test='Episode' className={EpisodeClasses}>
            <div data-test='ImageContainer' className={classes.ImageContainer}>
                <div data-test='Image' className={classes.EpisodeImg} style={{ backgroundImage: `url(${imgSrc})` }} />
            </div>
            <div data-test='Name' className={classes.Name}>{props.episode.name}</div>
            <div data-test='Number' className={classes.Number}>{props.episode.number}</div>
            <div data-test='Date' className={classes.Date}>{toBritishDate(props.episode.airdate)}</div>
        </div>)
}

episode.propTypes = {
    shouldLoadImg: PropTypes.bool,
    episode: PropTypes.shape({
        airdate: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.number,
        image: PropTypes.shape({
            medium: PropTypes.string
        })
    })
}

export default episode;