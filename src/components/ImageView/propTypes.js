import PropTypes from 'prop-types';

const imageViewPropTypes = {
    /** Whether source url requires authentication */
    isAuthTokenRequired: PropTypes.bool,

    /** Handles scale changed event in image zoom component. Used on native only */
    // eslint-disable-next-line react/no-unused-prop-types
    onScaleChanged: PropTypes.func.isRequired,

    /** URL to full-sized image */
    url: PropTypes.string.isRequired,

    /** image file name */
    fileName: PropTypes.string.isRequired,

    /** Handles errors while displaying the image */
    onError: PropTypes.func,

    /** Whether this view is the active screen  */
    isFocused: PropTypes.bool,

    /** Whether this AttachmentView is shown as part of a AttachmentCarousel */
    isUsedInCarousel: PropTypes.bool,

    /** When "isUsedInCarousel" is set to true, determines whether there is only one item in the carousel */
    isSingleCarouselItem: PropTypes.bool,
};

const imageViewDefaultProps = {
    isAuthTokenRequired: false,
    onError: () => {},
    isFocused: true,
    isUsedInCarousel: false,
    isSingleCarouselItem: false,
};

export {imageViewPropTypes, imageViewDefaultProps};
