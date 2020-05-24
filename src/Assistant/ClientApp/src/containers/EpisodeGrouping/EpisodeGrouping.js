import React, { Component, Fragment } from 'react';
import classes from './EpisodeGrouping.module.css';
import Episode from '../../components/TvShowComponents/Episode/Episode';

class EpisodeGrouping extends Component {

    state = {
        isCollapsed: true
    }

    toggleCollapsed = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed })
    }

    render() {
        let toggleClass = this.state.isCollapsed ? [classes.EpisodeCollection, classes.Collapsed].join(" ") : classes.EpisodeCollection;
        return (
            <div className={classes.EpisodeGrouping}>
                <div className={classes.Title} onClick={this.toggleCollapsed}>{`Season ${this.props.grouping.key}`}</div>
                <div className={toggleClass}>
                    <div className={classes.HeadersSection}>
                        <div className={classes.EpisodeImage}>Image</div>
                        <div className={classes.EpisodeName}>Name</div>
                        <div className={classes.EpisodeNumber}>Number</div>
                        <div className={classes.EpisodeReleaseDate}>Release Date</div>
                    </div>
                    {this.props.grouping.groupedCollection
                        .sort((a, b) => b.number - a.number)
                        .map(e => 
                            <Fragment>
                                <Episode key={e.id} episode={e} shouldLoadImg={!this.state.isCollapsed} />
                                <div className={classes.Divider}></div>
                            </Fragment>
                        )}
                </div>
            </div>
        )
    }

};

export default EpisodeGrouping;