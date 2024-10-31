import Config from 'react-native-config';
import type {NativeConfig} from 'react-native-config';
import E2ELogin from '@libs/E2E/actions/e2eLogin';
import waitForAppLoaded from '@libs/E2E/actions/waitForAppLoaded';
import E2EClient from '@libs/E2E/client';
import getConfigValueOrThrow from '@libs/E2E/utils/getConfigValueOrThrow';
import getPromiseWithResolve from '@libs/E2E/utils/getPromiseWithResolve';
import Performance from '@libs/Performance';
import CONST from '@src/CONST';

const test = (config: NativeConfig) => {
    // check for login (if already logged in the action will simply resolve)
    console.debug('[E2E] Logging in for chat opening');

    const name = getConfigValueOrThrow('name', config);

    E2ELogin().then((neededLogin) => {
        if (neededLogin) {
            return waitForAppLoaded().then(() =>
                // we don't want to submit the first login to the results
                E2EClient.submitTestDone(),
            );
        }

        console.debug('[E2E] Logged in, getting chat opening metrics and submitting them…');

        const [renderChatPromise] = getPromiseWithResolve();
        const [chatTTIPromise, chatTTIResolve] = getPromiseWithResolve();

        Promise.all([renderChatPromise, chatTTIPromise]).then(() => {
            console.debug(`[E2E] Submitting!`);

            E2EClient.submitTestDone();
        });

        Performance.subscribeToMeasurements((entry) => {
            console.debug(`[E2E] Entry: ${JSON.stringify(entry)}`);

            if (entry.name === CONST.TIMING.OPEN_REPORT) {
                E2EClient.submitTestResults({
                    branch: Config.E2E_BRANCH,
                    name: `${name} Chat TTI`,
                    metric: entry.duration,
                    unit: 'ms',
                })
                    .then(() => {
                        console.debug('[E2E] Done with chat TTI tracking, exiting…');
                        chatTTIResolve();
                    })
                    .catch((err) => {
                        console.debug('[E2E] Error while submitting test results:', err);
                    });
            }
        });
    });
};

export default test;
