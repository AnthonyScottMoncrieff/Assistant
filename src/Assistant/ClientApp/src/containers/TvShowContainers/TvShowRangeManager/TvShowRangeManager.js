import React, { Component } from 'react';
import TVShow from '../../../components/TvShowComponents/TvShow/TvShow'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './TvShowRangeManager.module.css';
import { Link } from 'react-router-dom';
import Add from '../../../components/UI/Add/Add';
import Modal from '../../../components/UI/Modal/Modal';
import AddNewShowDialog from '../AddNewShowDialog/AddNewShowDialog';
import ShowDeleteDialog from '../../../components/TvShowComponents/ShowDeleteDialog/ShowDeleteDialog';

class TvShowRangeManager extends Component {
    state = {
        shouldShowModal: false
    }

    dialogContent = <AddNewShowDialog />;

    componentDidMount() {
        this.props.onFetchTvShows(this.props.shows, false);
    }

    openAddTvshowModalHandler = () => {
        this.dialogContent = <AddNewShowDialog />;
        this.setState({ shouldShowModal: true });
    }

    openDeleteTvshowModalHandler = (show) => {
        this.dialogContent = <ShowDeleteDialog show={show} cancelSubmissionHandler={this.closeModalHandler} submitClickHandler={() => this.props.onDeleteTvShow(show.showKey, this.closeModalHandler)} />;
        this.setState({ shouldShowModal: true });
    }

    closeModalHandler = () => {
        this.setState({ shouldShowModal: false });
    }

    getShows = () => {
        let shows = <Spinner />;
        if (!this.props.loading && !this.props.error) {
            shows = this.props.shows.map(show =>
                <div className={classes.ShowContainer} key={show.showKey}>
                    <Link className={classes.Link} to={`/tv-shows/${show.showKey}`}>
                        <TVShow
                            thumbnailUrl={show.thumbnailUrl}
                            showName={show.showName}
                            description={show.summary} />
                    </Link>
                    <div className={classes.Delete} onClick={() => this.openDeleteTvshowModalHandler(show)}>X</div>
                </div>
            );
        }
        else if (this.props.error)
            shows = (<div>ERROR</div>);

        return shows;
    }

    render() {
        let shows = this.getShows();
        return (
            <div className={classes.TvShowRangeManager}>
                <Modal show={this.state.shouldShowModal} modalClosed={this.closeModalHandler}>{this.dialogContent}</Modal>
                <Add clicked={this.openAddTvshowModalHandler} />
                <div>
                    {shows}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        shows: state.tvShows.shows,
        loading: state.tvShows.tvShowsLoading,
        error: state.tvShows.tvShowFetchError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTvShows: (shows, forceRefresh) => shows.length > 0 && !forceRefresh ? null : dispatch(actions.initTvShows()),
        onDeleteTvShow: (showKey, closeModalHandler) => dispatch(actions.initTvShowDeletion(showKey, closeModalHandler))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TvShowRangeManager);