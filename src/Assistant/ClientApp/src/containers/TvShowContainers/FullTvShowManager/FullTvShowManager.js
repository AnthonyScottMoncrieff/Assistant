import React, { useEffect } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FullTvShow from '../../../components/TvShowComponents/FullTvShow/FullTvShow';
import EpisodeManager from '../EpisodeManager/EpisodeManager';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';

const FullTvShowManager = (props) => {
    const shows = useSelector((state) => state.tvShows.shows);
    const tvShowsloading = useSelector((state) => state.tvShows.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        if (shows.length > 0) return;
        else dispatch(actions.initTvShows());
    });

    let show = <Spinner>Loading...</Spinner>;
    let episodes = null;
    if (!tvShowsloading) {
        show = shows
            .filter((show) => show.showKey === props.match.params.showKey)
            .map((show) => <FullTvShow key={show.showKey} header={show.showName} thumbnailUrl={show.thumbnailUrl} description={show.summary} />);
        episodes = <EpisodeManager showKey={props.match.params.showKey} />;
    }

    return (
        <Container>
            {show}
            {episodes}
        </Container>
    );
};

FullTvShowManager.propTypes = {
    onFetchTvShows: PropTypes.func,
    tvShowsloading: PropTypes.bool,
    shows: PropTypes.arrayOf(
        PropTypes.shape({
            showKey: PropTypes.string,
            showName: PropTypes.string,
            thumbnailUrl: PropTypes.string,
            summary: PropTypes.string,
        })
    ),
};

export default FullTvShowManager;
