import React from 'react';
import classes from './ShowPreview.module.css';
import { stripHTMLTags } from '../../../shared/utilities/utilities';

const showPreview = (props) => {
    let strippedSummary = stripHTMLTags(props.showSummary);
    let cutSummary = strippedSummary.length > 243 ? `${strippedSummary.substring(0, 243)}...` : strippedSummary;

    return (
        <div className={classes.ShowPreview}>
            <img src={props.showImg} />
            <div className={classes.ShowDetail}>
                <div className={classes.ShowName}>{props.showName}</div>
                <div className={classes.ShowDescription}>{cutSummary}</div>
            </div>
        </div>
    )
};

export default showPreview;