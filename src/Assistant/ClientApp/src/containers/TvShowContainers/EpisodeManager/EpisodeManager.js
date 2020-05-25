import React, { Component, Fragment } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './EpisodeManager.module.css'
import { groupByShallowProperty } from '../../../shared/utilities/utilities';
import EpisodeGrouping from '../EpisodeGrouping/EpisodeGrouping';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';
import UpcomingEpisode from '../../../components/TvShowComponents/UpcomingEpisode/UpcomingEpisode';

class EpisodeManager extends Component {

    componentDidMount() {
        let show = this.props.showEpisodes.filter(x => x.showKey === this.props.showKey)[0];
        this.props.onFetchEpisodes(false, this.props.showKey, show);
    }

    componentWillUnmount() {
        this.props.onSetIsLoading();
    }

    render() {
        let episodeCollection = <Spinner />;
        let upcomingEpisode = null;
        if (!this.props.episodesLoading && !this.props.error) {
            let show = this.props.showEpisodes.filter(x => x.showKey === this.props.showKey)[0];
            episodeCollection = 
            <Fragment>
                <div className={classes.StyleIndex}><div className={classes.FutureColor}></div><div className={classes.FutureColorText}> - Denotes that the episode either airs today or in the future</div></div>
                {groupByShallowProperty(show.episodes, 'season')
                .sort((a, b) => b.key - a.key)
                .map(x => <EpisodeGrouping
                    key={x.key}
                    grouping={x} />)}
            </Fragment>
            upcomingEpisode = <UpcomingEpisode episodes={show.episodes} />
        }
        else if (this.props.error) {
            episodeCollection = <div>ERROR</div>
        }
        return (
            <Fragment>
                {upcomingEpisode}
                <div className={classes.Header}>Episodes</div>
                {episodeCollection}
            </Fragment>);
    }
}

const mapStateToProps = state => {
    return {
        episodesLoading: state.episodes.episodesLoading,
        error: state.episodes.episodesFetchError,
        showEpisodes: state.episodes.showEpisodes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchEpisodes: (forceRefresh, showKey, show) => show && (show.episodes.length > 0) && !forceRefresh ? dispatch(actions.setNotIsLoading()) : dispatch(actions.initEpisodes(showKey)),
        onSetIsLoading: () => dispatch(actions.setIsLoading())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeManager);