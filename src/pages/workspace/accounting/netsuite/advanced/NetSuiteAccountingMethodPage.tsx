import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import type {ValueOf} from 'type-fest';
import RadioListItem from '@components/SelectionList/RadioListItem';
import type {ListItem} from '@components/SelectionList/types';
import SelectionScreen from '@components/SelectionScreen';
import type {SelectorType} from '@components/SelectionScreen';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Connections from '@libs/actions/connections/NetSuiteCommands';
import Navigation from '@navigation/Navigation';
import type {WithPolicyConnectionsProps} from '@pages/workspace/withPolicyConnections';
import withPolicyConnections from '@pages/workspace/withPolicyConnections';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';

type MenuListItem = ListItem & {
    value: ValueOf<typeof CONST.NETSUITE_ACCOUNTING_METHODS>;
};

function NetSuiteAccountingMethodPage({policy}: WithPolicyConnectionsProps) {
    const {translate} = useLocalize();
    const policyID = policy?.id ?? '-1';
    const styles = useThemeStyles();
    const config = policy?.connections?.netsuite.options.config;
    const accountingMehtod = config?.accountingMethod ?? CONST.NETSUITE_ACCOUNTING_METHODS.CASH;
    const data: MenuListItem[] = Object.values(CONST.NETSUITE_ACCOUNTING_METHODS).map((accountingMehtodType) => ({
        value: accountingMehtodType,
        text: translate(`workspace.netsuite.advancedConfig.accountingMethods.values.${accountingMehtodType}`),
        alternateText: translate(`workspace.netsuite.advancedConfig.accountingMethods.alternateText.${accountingMehtodType}`),
        keyForList: accountingMehtodType,
        isSelected: accountingMehtod === accountingMehtodType,
    }));

    const headerContent = useMemo(
        () => (
            <View>
                <Text style={[styles.ph5, styles.pb5]}>{translate('workspace.netsuite.advancedConfig.accountingMethods.description')}</Text>
            </View>
        ),
        [translate, styles.pb5, styles.ph5],
    );

    const selectExpenseReportApprovalLevel = useCallback(
        (row: MenuListItem) => {
            if (row.value !== config?.accountingMethod) {
                Connections.updateNetSuiteAccountingMethod(policyID, row.value, config?.accountingMethod ?? CONST.NETSUITE_ACCOUNTING_METHODS.CASH);
            }
            Navigation.goBack(ROUTES.POLICY_ACCOUNTING_NETSUITE_AUTO_SYNC.getRoute(policyID));
        },
        [config?.accountingMethod, policyID],
    );

    return (
        <SelectionScreen
            displayName={NetSuiteAccountingMethodPage.displayName}
            title="workspace.netsuite.advancedConfig.accountingMethods.label"
            headerContent={headerContent}
            sections={[{data}]}
            listItem={RadioListItem}
            onSelectRow={(selection: SelectorType) => selectExpenseReportApprovalLevel(selection as MenuListItem)}
            initiallyFocusedOptionKey={data.find((mode) => mode.isSelected)?.keyForList}
            policyID={policyID}
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN]}
            featureName={CONST.POLICY.MORE_FEATURES.ARE_CONNECTIONS_ENABLED}
            onBackButtonPress={() => Navigation.goBack(ROUTES.POLICY_ACCOUNTING_NETSUITE_AUTO_SYNC.getRoute(policyID))}
            connectionName={CONST.POLICY.CONNECTIONS.NAME.NETSUITE}
        />
    );
}

NetSuiteAccountingMethodPage.displayName = 'NetSuiteExpenseReportApprovalLevelSelectPage';

export default withPolicyConnections(NetSuiteAccountingMethodPage);
