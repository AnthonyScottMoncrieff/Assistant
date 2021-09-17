import React, { useState, useEffect } from 'react';
import TVShow from '../../../components/TvShowComponents/TvShow/TvShow';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import classes from './TvShowRangeManager.module.css';
import { Link } from 'react-router-dom';
import Add from '../../../components/UI/Add/Add';
import Modal from '../../../components/UI/Modal/Modal';
import AddNewShowDialog from '../AddNewShowDialog/AddNewShowDialog';
import ShowDeleteDialog from '../../../components/TvShowComponents/ShowDeleteDialog/ShowDeleteDialog';
import { Container } from 'reactstrap';
import Error from '../../../components/UI/Error/Error';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const TvShowRangeManager = () => {
    let [dialogContent, setDialogContent] = useState(<AddNewShowDialog />);
    let [shouldShowModal, setShouldShowModal] = useState(false);
    const storeShows = useSelector((state) => state.tvShows.shows, shallowEqual);
    const fetchLoading = useSelector((state) => state.tvShows.tvShowsLoading);
    const fetchError = useSelector((state) => state.tvShows.tvShowFetchError);
    const deleteLoading = useSelector((state) => state.tvShows.tvShowDeletionLoading);
    const deleteError = useSelector((state) => state.tvShows.tvShowDeletionError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (storeShows.length > 0) return;
        else dispatch(actions.initTvShows());
    }, []);

    const openAddTvshowModalHandler = () => {
        setDialogContent((dialogContent = <AddNewShowDialog />));
        setShouldShowModal((shouldShowModal = true));
    };

    const openDeleteTvshowModalHandler = (show) => {
        const dialogDeleteContent = (
            <ShowDeleteDialog
                show={show}
                cancelSubmissionHandler={closeModalHandler}
                submitClickHandler={() => dispatch(actions.initTvShowDeletion(show.showKey, closeModalHandler))}
                disabled={deleteLoading}
                error={deleteError}
            />
        );
        setDialogContent((dialogContent = dialogDeleteContent));
        setShouldShowModal((shouldShowModal = true));
    };

    const closeModalHandler = () => {
        setShouldShowModal((shouldShowModal = false));
    };

    const getShows = () => {
        let shows = <Spinner>Loading...</Spinner>;
        if (!fetchLoading && !fetchError) {
            shows = storeShows.map((show) => (
                <div className={classes.ShowContainer} key={show.showKey}>
                    <Link className={classes.Link} to={`/tv-shows/${show.showKey}`}>
                        <TVShow thumbnailUrl={show.thumbnailUrl} showName={show.showName} description={show.summary} />
                    </Link>
                    <div className={classes.Delete} onClick={() => openDeleteTvshowModalHandler(show)}>
                        X
                    </div>
                </div>
            ));
        } else if (fetchError)
            shows = (
                <div>
                    <Error>Unable to fetch Shows</Error>
                </div>
            );

        return shows;
    };
    let shows = getShows();
    return (
        <Container>
            <div className={classes.TvShowRangeManager}>
                <Modal show={shouldShowModal} modalClosed={() => closeModalHandler()}>
                    {dialogContent}
                </Modal>
                <div>
                    <div className={classes.Title}>TV Shows</div>
                    <Add clicked={() => openAddTvshowModalHandler()} visible={!fetchLoading} />
                </div>
                <div className={classes.ShowCollection}>{shows}</div>
            </div>
        </Container>
    );
};

export default TvShowRangeManager;
