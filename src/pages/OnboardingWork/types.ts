import type {StackScreenProps} from '@react-navigation/stack';
import type {OnyxEntry} from 'react-native-onyx';
import type {OnboardingModalNavigatorParamList} from '@libs/Navigation/types';
import type SCREENS from '@src/SCREENS';
import type {OnboardingPurpose} from '@src/types/onyx';

type OnboardingWorkProps = Record<string, unknown> & StackScreenProps<OnboardingModalNavigatorParamList, typeof SCREENS.ONBOARDING.WORK>;

type BaseOnboardingWorkOnyxProps = {
    /** Saved onboarding purpose selected by the user */
    onboardingPurposeSelected: OnyxEntry<OnboardingPurpose>;

    /** Saved onboarding purpose selected by the user */
    onboardingPolicyID: OnyxEntry<string>;
};

type BaseOnboardingWorkProps = OnboardingWorkProps &
    BaseOnboardingWorkOnyxProps & {
        /* Whether to use native styles tailored for native devices */
        shouldUseNativeStyles: boolean;
    };

export type {OnboardingWorkProps, BaseOnboardingWorkOnyxProps, BaseOnboardingWorkProps};
