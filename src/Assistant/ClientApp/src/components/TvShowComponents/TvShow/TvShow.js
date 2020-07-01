import React from 'react';
import classes from './TvShow.module.css'
import { toHttps } from '../../../shared/utilities/utilities';
import PropTypes from'prop-types';

const tvShow = (props) => (
    <div data-test='TvShow' className={classes.TvShow}>
        <div data-test='TvShowImg' className={classes.TvShowImg} style={{ backgroundImage: `url(${toHttps(props.thumbnailUrl)})` }} />
        <div data-test='ShowName' className={classes.ShowName}>{props.showName.length > 38 ? `${props.showName.substring(0, 38)}...` : props.showName}</div>
        <div data-test='ShowDescription' className={classes.ShowDescription}>{props.description.length > 200 ? `${props.description.substring(0, 200)}...` : props.description}</div>
    </div>
)

tvShow.propTypes = {
    thumbnailUrl: PropTypes.string,
    showName: PropTypes.string,
    description: PropTypes.string
}

export default tvShow;