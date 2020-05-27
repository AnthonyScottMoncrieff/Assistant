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

class TvShowRangeManager extends Component {
    state = {
        shouldShowModal: false
    }

    componentDidMount() {
        this.props.onFetchTvShows(this.props.shows, false);
    }

    openAddTvshowModalHandler = () => {
        this.setState({ shouldShowModal: true });
    }

    closeAddTvshowModalHandler = () => {
        this.setState({ shouldShowModal: false });
    }

    render() {
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
                    <div className={classes.Delete}>X</div>
                </div>
            );
        }
        else if (this.props.error)
            shows = (<div>ERROR</div>);
        return (
            <div className={classes.TvShowRangeManager}>
                <Modal show={this.state.shouldShowModal} modalClosed={this.closeAddTvshowModalHandler}><AddNewShowDialog /></Modal>
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
        onFetchTvShows: (shows, forceRefresh) => shows.length > 0 && !forceRefresh ? null : dispatch(actions.initTvShows())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TvShowRangeManager);