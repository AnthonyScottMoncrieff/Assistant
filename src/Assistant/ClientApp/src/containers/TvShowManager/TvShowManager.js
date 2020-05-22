import React, { Component } from 'react';
import TVShow from '../../components/TvShow/TvShow'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './TvShowManager.module.css'

class TvShowManager extends Component{
    componentDidMount () {
        this.props.onFetchTvShows(this.props.shows, false);
    }
    
    render(){
        let shows = <Spinner />;
        if(!this.props.loading){
            shows = this.props.shows.map(show => 
               <TVShow 
                    key={show.showKey}
                    thumbnailUrl={show.thumbnailUrl} 
                    showName={show.showName} 
                    description={show.summary} /> );
        }
        return (
            <div className={classes.TvShowManager}>
                {shows}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        shows: state.tvShows.shows,
        loading: state.tvShows.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTvShows: (shows, forceRefresh) => shows.length > 0 && !forceRefresh ? null : dispatch( actions.initTvShows() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( TvShowManager );