import type {CentralPaneName} from '@libs/Navigation/types';
import SCREENS from '@src/SCREENS';

const CENTRAL_PANE_TO_RHP_MAPPING: Partial<Record<CentralPaneName, string[]>> = {
    [SCREENS.SETTINGS.PROFILE.ROOT]: [
        SCREENS.SETTINGS.PROFILE.DISPLAY_NAME,
        SCREENS.SETTINGS.PROFILE.CONTACT_METHODS,
        SCREENS.SETTINGS.PROFILE.CONTACT_METHOD_DETAILS,
        SCREENS.SETTINGS.PROFILE.NEW_CONTACT_METHOD,
        SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER,
        SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_DATE,
        SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_TIME,
        SCREENS.SETTINGS.PROFILE.STATUS,
        SCREENS.SETTINGS.PROFILE.PRONOUNS,
        SCREENS.SETTINGS.PROFILE.TIMEZONE,
        SCREENS.SETTINGS.PROFILE.TIMEZONE_SELECT,
        SCREENS.SETTINGS.PROFILE.LEGAL_NAME,
        SCREENS.SETTINGS.PROFILE.DATE_OF_BIRTH,
        SCREENS.SETTINGS.PROFILE.ADDRESS,
        SCREENS.SETTINGS.PROFILE.ADDRESS_COUNTRY,
        SCREENS.SETTINGS.SHARE_CODE,
        SCREENS.SETTINGS.EXIT_SURVEY.REASON,
        SCREENS.SETTINGS.EXIT_SURVEY.RESPONSE,
        SCREENS.SETTINGS.EXIT_SURVEY.CONFIRM,
    ],
    [SCREENS.SETTINGS.PREFERENCES.ROOT]: [SCREENS.SETTINGS.PREFERENCES.PRIORITY_MODE, SCREENS.SETTINGS.PREFERENCES.LANGUAGE, SCREENS.SETTINGS.PREFERENCES.THEME],
    [SCREENS.SETTINGS.WALLET.ROOT]: [
        SCREENS.SETTINGS.WALLET.DOMAIN_CARD,
        SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.NAME,
        SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.PHONE,
        SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.ADDRESS,
        SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.CONFIRM,
        SCREENS.SETTINGS.WALLET.TRANSFER_BALANCE,
        SCREENS.SETTINGS.WALLET.CHOOSE_TRANSFER_ACCOUNT,
        SCREENS.SETTINGS.WALLET.ENABLE_PAYMENTS,
        SCREENS.SETTINGS.WALLET.CARD_ACTIVATE,
        SCREENS.SETTINGS.WALLET.REPORT_VIRTUAL_CARD_FRAUD,
        SCREENS.SETTINGS.WALLET.CARDS_DIGITAL_DETAILS_UPDATE_ADDRESS,
        SCREENS.SETTINGS.WALLET.VERIFY_ACCOUNT,
    ],
    [SCREENS.SETTINGS.SECURITY]: [
        SCREENS.SETTINGS.TWO_FACTOR_AUTH,
        SCREENS.SETTINGS.CLOSE,
        SCREENS.SETTINGS.DELEGATE.ADD_DELEGATE,
        SCREENS.SETTINGS.DELEGATE.DELEGATE_ROLE,
        SCREENS.SETTINGS.DELEGATE.UPDATE_DELEGATE_ROLE,
        SCREENS.SETTINGS.DELEGATE.DELEGATE_CONFIRM,
        SCREENS.SETTINGS.DELEGATE.UPDATE_DELEGATE_ROLE_MAGIC_CODE,
    ],
    [SCREENS.SETTINGS.ABOUT]: [SCREENS.SETTINGS.APP_DOWNLOAD_LINKS],
    [SCREENS.SETTINGS.SAVE_THE_WORLD]: [SCREENS.I_KNOW_A_TEACHER, SCREENS.INTRO_SCHOOL_PRINCIPAL, SCREENS.I_AM_A_TEACHER],
    [SCREENS.SETTINGS.TROUBLESHOOT]: [SCREENS.SETTINGS.CONSOLE],
    [SCREENS.SEARCH.CENTRAL_PANE]: [
        SCREENS.SEARCH.REPORT_RHP,
        SCREENS.SEARCH.TRANSACTION_HOLD_REASON_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_CURRENCY_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_DATE_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_DESCRIPTION_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_MERCHANT_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_REPORT_ID_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_AMOUNT_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_CATEGORY_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_KEYWORD_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_TAX_RATE_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_EXPENSE_TYPE_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_TAG_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_FROM_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_TO_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_IN_RHP,
        SCREENS.SEARCH.ADVANCED_FILTERS_CARD_RHP,
        SCREENS.SEARCH.SAVED_SEARCH_RENAME_RHP,
    ],
    [SCREENS.SETTINGS.SUBSCRIPTION.ROOT]: [
        SCREENS.SETTINGS.SUBSCRIPTION.ADD_PAYMENT_CARD,
        SCREENS.SETTINGS.SUBSCRIPTION.SIZE,
        SCREENS.SETTINGS.SUBSCRIPTION.DISABLE_AUTO_RENEW_SURVEY,
        SCREENS.SETTINGS.SUBSCRIPTION.REQUEST_EARLY_CANCELLATION,
        SCREENS.SETTINGS.SUBSCRIPTION.CHANGE_BILLING_CURRENCY,
        SCREENS.SETTINGS.SUBSCRIPTION.CHANGE_PAYMENT_CURRENCY,
    ],
};

export default CENTRAL_PANE_TO_RHP_MAPPING;
