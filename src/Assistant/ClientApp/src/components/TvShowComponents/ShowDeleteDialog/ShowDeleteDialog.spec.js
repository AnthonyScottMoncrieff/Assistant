import React from 'react';
import { render } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import ShowDeleteDialog from './ShowDeleteDialog';

describe('Show Delete Dialog tests', () => {
    const getProps = (disabled, thumbnailUrl, showName, summary, error) => {
        return {
            show: {
                thumbnailUrl,
                showName,
                summary
            },
            disabled,
            error,
            submitClickHandler: () => {},
            cancelSubmissionHandler: () => {}
        }
    }

    it('showDeleteDialog should render correctly on happy path', () => {
        let disabled = false;
        let thumbnailUrl = 'https://www.thumb.com';
        let showName = 'show';
        let summary = 'summary';
        let error = false
        let props = getProps(disabled, thumbnailUrl, showName, summary, error);

        let component = render(<ShowDeleteDialog {...props} />);

        
    })
})