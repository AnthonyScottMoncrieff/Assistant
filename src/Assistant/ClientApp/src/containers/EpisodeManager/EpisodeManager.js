import React, { Component, Fragment } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './EpisodeManager.module.css'
import { groupByShallowProperty } from '../../shared/utilities/utilities';
import Episode from '../../components/TvShowComponents/Episode/Episode';
import * as actions from '../../store/actions'
import { connect } from 'react-redux';

class EpisodeManager extends Component{

    componentDidMount () {
        let show = this.props.showEpisodes.filter(x => x.showKey === this.props.showKey)[0];
        this.props.onFetchEpisodes(false, this.props.showKey, show);
    }

    componentWillUnmount(){
        this.props.onSetIsLoading();
    }

    render(){
        let episodeCollection = <Spinner />;
        if(!this.props.episodesLoading && !this.props.error){
            console.log(this.props.showEpisodes)
            let show = this.props.showEpisodes.filter(x => x.showKey === this.props.showKey)[0];
            let groupedCollection = groupByShallowProperty(show.episodes, 'season');
            let sortedCollection = groupedCollection.sort((a, b) => b.key - a.key);
            episodeCollection = sortedCollection
                .map(grouping => 
                    grouping.groupedCollection.sort((a, b) => b.number - a.number)
                    .map(episode => <Episode key={episode.id} episode={episode} />)).flat()
        }
        else if(this.props.error){
            episodeCollection = <div>ERROR</div>
        }
        return (
            <Fragment>
                <div className={classes.Header}></div>
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
        onFetchEpisodes: (forceRefresh, showKey, show) => show && (show.episodes.length > 0) && !forceRefresh ? dispatch(actions.setNotIsLoading()) : dispatch( actions.initEpisodes(showKey) ),
        onSetIsLoading: () => dispatch(actions.setIsLoading())
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( EpisodeManager );