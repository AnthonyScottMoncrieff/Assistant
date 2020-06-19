import React from 'react';
import classes from './ShowPreview.module.css';
import { stripHTMLTags } from '../../../shared/utilities/utilities';

const showPreview = (props) => {
    let strippedSummary = stripHTMLTags(props.showSummary);
    let cutSummary = strippedSummary.length > 243 ? `${strippedSummary.substring(0, 243)}...` : strippedSummary;

    return (
        <div data-test='ShowPreview' className={classes.ShowPreview}>
            <div data-test='Image' className={classes.Image} style={{ backgroundImage: `url(${props.showImg})` }}/>
            <div data-test='ShowDetail' className={classes.ShowDetail}>
                <div data-test='ShowName' className={classes.ShowName}>{props.showName}</div>
                <div data-test='ShowDescription' className={classes.ShowDescription}>{cutSummary}</div>
            </div>
        </div>
    )
};

export default showPreview;