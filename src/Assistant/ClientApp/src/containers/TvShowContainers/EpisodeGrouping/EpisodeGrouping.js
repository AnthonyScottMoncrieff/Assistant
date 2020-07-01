import React, { Component, Fragment } from 'react';
import classes from './EpisodeGrouping.module.css';
import Episode from '../../../components/TvShowComponents/Episode/Episode';
import EpisodeGroupingHeader from '../../../components/TvShowComponents/EpisodeGroupingHeader/EpisodeGroupingHeader';
import PropTypes from 'prop-types';

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
                    <EpisodeGroupingHeader />
                    {this.props.grouping.groupedCollection
                        .sort((a, b) => b.number - a.number)
                        .map(e =>
                            <Fragment key={e.id}>
                                <Episode episode={e} shouldLoadImg={!this.state.isCollapsed} />
                                <div className={classes.Divider}></div>
                            </Fragment>
                        )}
                </div>
            </div>
        )
    }
};

EpisodeGrouping.propTypes = {
    grouping: PropTypes.shape({
        key: PropTypes.number,
        groupedCollection: PropTypes.arrayOf(PropTypes.shape({
            number: PropTypes.number,
            id: PropTypes.number
        }))
    })
}

export default EpisodeGrouping;