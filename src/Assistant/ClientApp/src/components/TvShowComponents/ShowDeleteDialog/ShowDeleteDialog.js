import React from 'react';
import classes from './ShowDeleteDialog.module.css';
import Button from '../../UI/Button/Button';
import ShowPreview from '../ShowPreview/ShowPreview';

const showDeleteDialog = (props) => {
    let errorMessage = props.error ? <div>ERROR; Please try again later</div> : null;
    return (
        <div className={classes.ShowDeleteDialog}>
            <ShowPreview showImg={props.show.thumbnailUrl} showName={props.show.showName} showSummary={props.show.summary} />
            <div className={classes.Actions}>
                <Button btnType="Danger" clicked={props.submitClickHandler} disabled={props.disabled}>Delete</Button>
                <Button btnType="Success" clicked={props.cancelSubmissionHandler} disabled={props.disabled}>Cancel</Button>
            </div>
            {errorMessage}
        </div>)
}

export default showDeleteDialog;