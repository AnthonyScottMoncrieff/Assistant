import React, { Component, Fragment } from 'react';
import classes from './AddNewShowDialog.module.css';
import Input from '../../../components/UI/Input/Input';
import { updateObject } from '../../../shared/utilities/utilities';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ShowPreview from '../../../components/TvShowComponents/ShowPreview/ShowPreview';
import axios from 'axios';

class AddNewShowDialog extends Component {
    state = {
        tvShowRequest: {
            userDefinedName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Show Name'
                },
                value: '',
                validation: {
                    expression: /^.+$/g
                },
                valid: false,
                touched: false
            },
            selectedShow: null,
            fetchingShow: false,
            errorFetchingShow: false,
            searchTerm: ""
        }
    }

    cancelSubmissionHandler = () => {
        let updatedTvshowRequest = updateObject(this.state.tvShowRequest, {selectedShow: null, searchTerm: ""});
        this.setState({tvShowRequest: updatedTvshowRequest});
        document.getElementById('modal-backdrop').click();
    }

    fetchShowHandler = () => {
        let showRequest = this.state.tvShowRequest;
        let parsedValue =  showRequest.userDefinedName.value.replace(/(?!\s)[\W]/g, "").replace(/\s/g, "-");
        this.setState({tvShowRequest: updateObject(this.state.tvShowRequest, {fetchingShow: true, searchTerm: parsedValue})});
        axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${parsedValue}`)
            .then((response) => {
                let updatedTvshowRequest = updateObject(this.state.tvShowRequest, {selectedShow: response.data, fetchingShow: false, errorFetchingShow: false});
                this.setState({tvShowRequest: updatedTvshowRequest});
            })
            .catch(err => {
                let updatedTvshowRequest = updateObject(this.state.tvShowRequest, {fetchingShow: false, errorFetchingShow: true});
                this.setState({tvShowRequest: updatedTvshowRequest});
            })
    }

    updateUserDefinedName = (prop) => {
        let userDefinedName = updateObject(this.state.tvShowRequest.userDefinedName, prop);
        this.setState({
            tvShowRequest: updateObject(this.state.tvShowRequest, {
                userDefinedName: userDefinedName
            })
        })
    }

    userDefinedNameChangedHandler = (event) => {
        if (!this.state.tvShowRequest.userDefinedName.touched)
            this.updateUserDefinedName({ touched: true });

        let isValid = event.target.value.match(this.state.tvShowRequest.userDefinedName.validation.expression) !== null;
        this.updateUserDefinedName({ valid: isValid, value: event.target.value });
    }

    render() {
        let showRequest = this.state.tvShowRequest;
        let selectedShowDisplay = showRequest.errorFetchingShow 
            ? <div>ERROR FETCHING SHOW</div> 
            : showRequest.selectedShow === null && !showRequest.fetchingShow 
                ? null
                : showRequest.selectedShow === null && showRequest.fetchingShow 
                    ? <Spinner /> 
                    : <ShowPreview 
                        showImg={showRequest.selectedShow.image.medium} 
                        showName={showRequest.selectedShow.name}
                        showSummary={showRequest.selectedShow.summary} />;
        let submit = showRequest.selectedShow !== null 
            ? <Fragment>
                <Button btnType="Success">Submit</Button>
                <Button btnType="Danger" clicked={this.cancelSubmissionHandler}>Cancel</Button>
              </Fragment>
            : null;

        return (
            <div className={classes.AddNewShowDialog}>
                <div className={classes.ShowSearchTitle}>Enter show to search for: </div>
                <div>
                    <div className={classes.TvShowEntry}>
                        <Input
                            elementType="input"
                            elementConfig={showRequest.userDefinedName.elementConfig}
                            value={showRequest.userDefinedName.value}
                            invalid={!showRequest.userDefinedName.valid}
                            touched={showRequest.userDefinedName.touched}
                            changed={this.userDefinedNameChangedHandler} />
                    </div>
                    <div className={classes.TvShowEntrySearchButton}>
                        <Button btnType="Success" disabled={!showRequest.userDefinedName.valid} clicked={this.fetchShowHandler}>Search</Button>
                    </div>
                </div>
                {selectedShowDisplay}
                <div className={classes.SubmitRegion}>
                    {submit}
                </div>
            </div>
        )
    }
}

export default AddNewShowDialog;