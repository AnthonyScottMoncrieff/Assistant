import React, { useEffect, Fragment } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './EpisodeManager.module.css';
import { groupByShallowProperty } from '../../../shared/utilities/utilities';
import EpisodeGrouping from '../EpisodeGrouping/EpisodeGrouping';
import * as actions from '../../../store/actions';
import UpcomingEpisode from '../../../components/TvShowComponents/UpcomingEpisode/UpcomingEpisode';
import Error from '../../../components/UI/Error/Error';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const EpisodeManager = (props) => {
    const episodesLoading = useSelector((state) => state.episodes.episodesLoading);
    const error = useSelector((state) => state.episodes.episodesFetchError);
    const showEpisodes = useSelector((state) => state.episodes.showEpisodes);
    const dispatch = useDispatch();

    useEffect(() => {
        let show = showEpisodes.filter((x) => x.showKey === props.showKey)[0];
        if (show && show.episodes.length > 0) dispatch(actions.setNotIsLoading());
        else dispatch(actions.initEpisodes(props.showKey));

        return () => dispatch(actions.setIsLoading());
    });

    let episodeCollection = <Spinner>Loading...</Spinner>;
    let upcomingEpisode = null;
    if (!episodesLoading && !error) {
        let show = showEpisodes.filter((x) => x.showKey === props.showKey)[0];
        episodeCollection = (
            <Fragment>
                <div className={classes.StyleIndex}>
                    <div className={classes.FutureColor}></div>
                    <div className={classes.FutureColorText}> - Denotes that the episode either airs today or in the future</div>
                </div>
                {groupByShallowProperty(show.episodes, 'season')
                    .sort((a, b) => b.key - a.key)
                    .map((x) => (
                        <EpisodeGrouping key={x.key} grouping={x} />
                    ))}
            </Fragment>
        );
        upcomingEpisode = <UpcomingEpisode episodes={show.episodes} />;
    } else if (error) {
        episodeCollection = (
            <div>
                <Error>Unable to fetch episodes</Error>
            </div>
        );
    }
    return (
        <Fragment>
            {upcomingEpisode}
            <div className={classes.Header}>Episodes</div>
            {episodeCollection}
        </Fragment>
    );
};

EpisodeManager.propTypes = {
    showKey: PropTypes.string,
};

export default EpisodeManager;
