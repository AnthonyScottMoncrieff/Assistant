import React from 'react';
import classes from './ShowDeleteDialog.module.css';
import Button from '../../UI/Button/Button';
import ShowPreview from '../ShowPreview/ShowPreview';
import Error from '../../UI/Error/Error';

const showDeleteDialog = (props) => {
    return (
        <div className={classes.ShowDeleteDialog}>
            <ShowPreview showImg={props.show.thumbnailUrl} showName={props.show.showName} showSummary={props.show.summary} />
            <div className={classes.Actions}>
                <Button btnType="Danger" clicked={props.submitClickHandler} disabled={props.disabled}>Delete</Button>
                <Button btnType="Success" clicked={props.cancelSubmissionHandler} disabled={props.disabled}>Cancel</Button>
            </div>
            <Error isVisible={props.error}>ERROR: Could not delete, please try again later</Error>
        </div>)
}

export default showDeleteDialog;