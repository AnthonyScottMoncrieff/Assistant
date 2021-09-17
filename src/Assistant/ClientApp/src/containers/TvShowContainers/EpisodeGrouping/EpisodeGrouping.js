import React, { useState, Fragment } from 'react';
import classes from './EpisodeGrouping.module.css';
import Episode from '../../../components/TvShowComponents/Episode/Episode';
import EpisodeGroupingHeader from '../../../components/TvShowComponents/EpisodeGroupingHeader/EpisodeGroupingHeader';
import PropTypes from 'prop-types';

const EpisodeGrouping = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleClass = isCollapsed ? [classes.EpisodeCollection, classes.Collapsed].join(' ') : classes.EpisodeCollection;

    return (
        <div className={classes.EpisodeGrouping}>
            <div className={classes.Title} onClick={() => setIsCollapsed(!isCollapsed)}>{`Season ${props.grouping.key}`}</div>
            <div className={toggleClass}>
                <EpisodeGroupingHeader />
                {props.grouping.groupedCollection
                    .sort((a, b) => b.number - a.number)
                    .map((e) => (
                        <Fragment key={e.id}>
                            <Episode episode={e} shouldLoadImg={!isCollapsed} />
                            <div className={classes.Divider}></div>
                        </Fragment>
                    ))}
            </div>
        </div>
    );
};

EpisodeGrouping.propTypes = {
    grouping: PropTypes.shape({
        key: PropTypes.number,
        groupedCollection: PropTypes.arrayOf(
            PropTypes.shape({
                number: PropTypes.number,
                id: PropTypes.number,
            })
        ),
    }),
};

export default EpisodeGrouping;
