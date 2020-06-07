import React, { Component, Fragment } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FullTvShow from '../../../components/TvShowComponents/FullTvShow/FullTvShow';
import EpisodeManager from '../EpisodeManager/EpisodeManager';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class FullTvShowManager extends Component {
    componentDidMount() {
        this.props.onFetchTvShows(this.props.shows, false);
    }

    render() {
        let show = <Spinner>Loading...</Spinner>;
        let episodes = null;
        if (!this.props.tvShowsloading) {
            show = (
                this.props.shows
                    .filter(show => show.showKey === this.props.match.params.showKey)
                    .map(show => <FullTvShow key={show.showKey} header={show.showName} thumbnailUrl={show.thumbnailUrl} description={show.summary} />))
            episodes = <EpisodeManager showKey={this.props.match.params.showKey} />
        }

        return (
            <Fragment>
                {show}
                {episodes}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        shows: state.tvShows.shows,
        tvShowsloading: state.tvShows.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTvShows: (shows, forceRefresh) => shows.length > 0 && !forceRefresh ? null : dispatch(actions.initTvShows())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullTvShowManager);