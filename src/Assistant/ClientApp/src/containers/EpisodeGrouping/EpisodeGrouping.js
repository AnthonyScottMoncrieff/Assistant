import React, { Component } from 'react';
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
            <div className={classes.EpisodeGrouping} onClick={this.toggleCollapsed}>
                <div className={classes.Title}>{`Season ${this.props.grouping.key}`}</div>
                <div className={toggleClass}>
                    {this.props.grouping.groupedCollection
                        .sort((a, b) => b.number - a.number)
                        .map(e => <Episode key={e.id} episode={e} />)}
                </div>
            </div>
        )
    }

};

export default EpisodeGrouping;