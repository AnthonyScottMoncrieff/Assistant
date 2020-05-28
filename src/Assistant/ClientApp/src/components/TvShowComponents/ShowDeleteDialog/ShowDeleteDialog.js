import React from 'react';
import classes from './ShowDeleteDialog.module.css';
import Button from '../../UI/Button/Button';

const showDeleteDialog = (props) => (
    <div className={classes.ShowDeleteDialog}>
        <div className={classes.Question}>Are you sure you want to delete <span className={classes.ShowName}>{props.show.showName}</span></div>
        <Button btnType="Success" clicked={props.cancelSubmissionHandler}>No</Button>
        <Button btnType="Danger" clicked={props.submitClickHandler}>Yes</Button>
    </div>
)

export default showDeleteDialog;