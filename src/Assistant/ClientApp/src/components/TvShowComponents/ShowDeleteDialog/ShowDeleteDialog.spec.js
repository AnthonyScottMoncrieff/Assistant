import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../../TestAssets/utilities';
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

        let component = mount(<ShowDeleteDialog {...props} />);

        let showDeleteDialogNode = findByTestAtrr(component, 'ShowDeleteDialog');
        expect(showDeleteDialogNode.length).toBe(1);

        let showPreviewNode = findByTestAtrr(component, 'ShowPreview');
        expect(showPreviewNode.length).toBe(1);

        let actionsNode = findByTestAtrr(component, 'Actions');
        expect(actionsNode.length).toBe(1);

        let buttonNodes = findByTestAtrr(component, 'Button');
        expect(buttonNodes.length).toBe(2);

        let errorNode = findByTestAtrr(component, 'ErrorRoot');
        expect(errorNode.length).toBe(0);

        const propsErr = checkProps(component, props);
        expect(propsErr).toBeUndefined();
    })

    it('showDeleteDialog should render correctly on error', () => {
        let disabled = false;
        let thumbnailUrl = 'https://www.thumb.com';
        let showName = 'show';
        let summary = 'summary';
        let error = true
        let props = getProps(disabled, thumbnailUrl, showName, summary, error);

        let component = mount(<ShowDeleteDialog {...props} />);

        let showDeleteDialogNode = findByTestAtrr(component, 'ShowDeleteDialog');
        expect(showDeleteDialogNode.length).toBe(1);

        let showPreviewNode = findByTestAtrr(component, 'ShowPreview');
        expect(showPreviewNode.length).toBe(1);

        let actionsNode = findByTestAtrr(component, 'Actions');
        expect(actionsNode.length).toBe(1);

        let buttonNodes = findByTestAtrr(component, 'Button');
        expect(buttonNodes.length).toBe(2);

        let errorNode = findByTestAtrr(component, 'ErrorRoot');
        expect(errorNode.length).toBe(1);
        
        const propsErr = checkProps(component, props);
        expect(propsErr).toBeUndefined();
    })
})