import type {OnyxEntry} from 'react-native-onyx';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {OnboardingModalNavigatorParamList} from '@libs/Navigation/types';
import type {OnboardingPurposeType} from '@src/CONST';
import type SCREENS from '@src/SCREENS';

type OnboardingWorkProps = Record<string, unknown> & PlatformStackScreenProps<OnboardingModalNavigatorParamList, typeof SCREENS.ONBOARDING.WORK>;

type BaseOnboardingWorkOnyxProps = {
    /** Saved onboarding purpose selected by the user */
    onboardingPurposeSelected: OnyxEntry<OnboardingPurposeType>;

    /** Saved onboarding purpose selected by the user */
    onboardingPolicyID: OnyxEntry<string>;
};

type BaseOnboardingWorkProps = OnboardingWorkProps &
    BaseOnboardingWorkOnyxProps & {
        /* Whether to use native styles tailored for native devices */
        shouldUseNativeStyles: boolean;
    };

export type {OnboardingWorkProps, BaseOnboardingWorkOnyxProps, BaseOnboardingWorkProps};
