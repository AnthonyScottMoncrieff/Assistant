import React from 'react';
import { isDateInFuture } from '../../../shared/utilities/utilities';
import Episode from '../Episode/Episode';
import EpisodeGroupingHeader from '../EpisodeGroupingHeader/EpisodeGroupingHeader';
import classes from './UpcomingEpisode.module.css';

const upcomingEpisode = (props) => {
    let upcomingEpisode = props.episodes.filter(x => x.airdate !== null && isDateInFuture(x.airdate)).sort((a, b) => new Date(a.airdate) - new Date(b.airdate))[0];
    if(upcomingEpisode === undefined)
        return null;
    
    return(
        <div className={classes.UpComingEpisodeContainer}>
            <div className={classes.Header}>Upcoming Episode</div>
            <div className={classes.UpComingEpisode}>
                <EpisodeGroupingHeader />
                <Episode shouldLoadImg={true} episode={upcomingEpisode} />
            </div>
        </div>
    )
}

export default upcomingEpisode;