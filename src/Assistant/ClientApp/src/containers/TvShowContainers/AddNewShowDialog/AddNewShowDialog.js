import React, { Component, Fragment } from 'react';
import classes from './AddNewShowDialog.module.css';
import Input from '../../../components/UI/Input/Input';
import { updateObject, toHttps } from '../../../shared/utilities/utilities';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ShowPreview from '../../../components/TvShowComponents/ShowPreview/ShowPreview';
import axios from 'axios';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import Error from '../../../components/UI/Error/Error';
import PropTypes from 'prop-types';

class AddNewShowDialog extends Component {
    state = {
        tvShowRequest: {
            userDefinedName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Show Name',
                },
                value: '',
                validation: {
                    expression: /^.+$/g,
                },
                valid: false,
                touched: false,
            },
            selectedShow: null,
            fetchingShow: false,
            error: false,
            errorMessage: '',
            searchTerm: '',
        },
    };

    submitClickHandler = () => {
        if (this.props.shows.filter((x) => x.showKey === this.state.tvShowRequest.searchTerm).length === 0) {
            let updatedTvshowRequest = updateObject(this.state.tvShowRequest, {
                error: false,
                errorMessage: '',
            });
            this.setState({ tvShowRequest: updatedTvshowRequest });
            this.props.onSubmitTvShow(this.state.tvShowRequest.selectedShow, this.state.tvShowRequest.searchTerm, () =>
                this.cancelSubmissionHandler()
            );
        } else {
            let updatedTvshowRequest = updateObject(this.state.tvShowRequest, {
                error: true,
                errorMessage: 'ERROR: You attempted to add a duplicate show',
            });
            this.setState({ tvShowRequest: updatedTvshowRequest });
        }
    };

    cancelSubmissionHandler = () => {
        this.updateUserDefinedName({ value: '', valid: false });
        let updatedTvshowRequest = updateObject(this.state.tvShowRequest, {
            selectedShow: null,
            searchTerm: '',
        });
        this.setState({ tvShowRequest: updatedTvshowRequest });
        document.getElementById('modal-backdrop').click();
    };

    fetchShowHandler = () => {
        let showRequest = this.state.tvShowRequest;
        let parsedValue = showRequest.userDefinedName.value.replace(/(?!\s)[\W]/g, '').replace(/\s/g, '%20');
        this.setState({
            tvShowRequest: updateObject(this.state.tvShowRequest, {
                fetchingShow: true,
                searchTerm: parsedValue,
            }),
        });
        axios
            .get(`https://api.tvmaze.com/singlesearch/shows?q=${parsedValue}`)
            .then((response) => {
                let updatedTvshowRequest = updateObject(this.state.tvShowRequest, {
                    selectedShow: response.data,
                    fetchingShow: false,
                    error: false,
                    errorMessage: '',
                });
                this.setState({ tvShowRequest: updatedTvshowRequest });
            })
            .catch((_) => {
                let updatedTvshowRequest = updateObject(this.state.tvShowRequest, {
                    fetchingShow: false,
                    error: true,
                    errorMessage: 'ERROR: Cannot find show with this name',
                });
                this.setState({ tvShowRequest: updatedTvshowRequest });
            });
    };

    updateUserDefinedName = (prop) => {
        let userDefinedName = updateObject(this.state.tvShowRequest.userDefinedName, prop);
        this.setState({
            tvShowRequest: updateObject(this.state.tvShowRequest, {
                userDefinedName: userDefinedName,
            }),
        });
    };

    userDefinedNameChangedHandler = (event) => {
        if (!this.state.tvShowRequest.userDefinedName.touched) this.updateUserDefinedName({ touched: true });

        let isValid = event.target.value.match(this.state.tvShowRequest.userDefinedName.validation.expression) !== null;
        this.updateUserDefinedName({ valid: isValid, value: event.target.value });
    };

    render() {
        let showRequest = this.state.tvShowRequest;
        let selectedShowDisplay =
            showRequest.error || (showRequest.selectedShow === null && !showRequest.fetchingShow) ? null : showRequest.selectedShow === null &&
              showRequest.fetchingShow ? (
                <Spinner>Loading...</Spinner>
            ) : (
                <Fragment>
                    <ShowPreview
                        showImg={toHttps(showRequest.selectedShow.image.medium)}
                        showName={showRequest.selectedShow.name}
                        showSummary={showRequest.selectedShow.summary}
                    />
                    <div className={classes.SubmitRegion}>
                        <Button btnType="Success" clicked={this.submitClickHandler} disabled={this.props.loading}>
                            Submit
                        </Button>
                        <Button btnType="Danger" clicked={this.cancelSubmissionHandler}>
                            Cancel
                        </Button>
                    </div>
                </Fragment>
            );

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
                            changed={this.userDefinedNameChangedHandler}
                        />
                    </div>
                    <div className={classes.TvShowEntrySearchButton}>
                        <Button btnType="Success" disabled={!showRequest.userDefinedName.valid} clicked={this.fetchShowHandler}>
                            Search
                        </Button>
                    </div>
                </div>
                {selectedShowDisplay}
                <Error isVisible={this.state.tvShowRequest.error}>{this.state.tvShowRequest.errorMessage}</Error>
            </div>
        );
    }
}

AddNewShowDialog.propTypes = {
    loading: PropTypes.bool,
    onSubmitTvShow: PropTypes.func,
    shows: PropTypes.arrayOf(
        PropTypes.shape({
            showKey: PropTypes.string,
        })
    ),
};

const mapStateToProps = (state) => {
    return {
        loading: state.tvShows.tvShowSubmissionLoading,
        error: state.tvShows.tvShowSubmissionError,
        shows: state.tvShows.shows,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitTvShow: (show, key, closeDialog) => (show === null ? null : dispatch(actions.initTvShowSubmission(show, key, closeDialog))),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewShowDialog);
