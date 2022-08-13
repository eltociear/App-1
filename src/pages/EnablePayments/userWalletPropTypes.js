import PropTypes from 'prop-types';

/** User's wallet information */
export default PropTypes.shape({
    /** The user's available wallet balance */
    availableBalance: PropTypes.number,

    /** The user's current wallet balance */
    currentBalance: PropTypes.number,

        /** If we should show the FailedKYC view after the user submitted their info with a non fixable error */
        shouldShowFailedKYC: PropTypes.bool,

        /** Whether we should show the ActivateStep view success view after the user finished the KYC flow */
        shouldShowWalletActivationSuccess: PropTypes.bool,
    }),
};
