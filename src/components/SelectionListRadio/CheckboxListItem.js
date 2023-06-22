import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
import PressableWithFeedback from '../Pressable/PressableWithFeedback';
import styles from '../../styles/styles';
import Text from '../Text';
import {radioListItemPropTypes} from './selectionListRadioPropTypes';
import Checkbox from '../Checkbox';
import FormHelpMessage from '../FormHelpMessage';
import {propTypes as item} from '../UserDetailsTooltip/userDetailsTooltipPropTypes';
import withLocalize, {withLocalizePropTypes} from '../withLocalize';

const propTypes = {
    /** The section list item */
    item: PropTypes.shape(radioListItemPropTypes),

    /** Whether this item is focused (for arrow key controls) */
    isFocused: PropTypes.bool,

    /** Callback to fire when the item is pressed */
    onSelectRow: PropTypes.func,

    ...withLocalizePropTypes,
};

const defaultProps = {
    item: {},
    isFocused: false,
    onSelectRow: () => {},
};

function CheckboxListItem(props) {
    // TODO: REVIEW ERRORS

    const errors = {};

    return (
        <>
            <PressableWithFeedback
                // style={[styles.peopleRow, (_.isEmpty(props.item.errors) || errors[item.accountID]) && styles.peopleRowBorderBottom, hasError && styles.borderColorDanger]}
                style={[styles.peopleRow]}
                onPress={() => props.onSelectRow(props.item)}
                accessibilityLabel={props.item.text}
                accessibilityRole="checkbox"
                accessibilityState={{checked: props.item.isSelected}}
                hoverDimmingValue={1}
                hoverStyle={styles.hoveredComponentBG}
                focusStyle={styles.hoveredComponentBG}
            >
                <Checkbox
                    isChecked={props.item.isSelected}
                    onPress={() => props.onSelectRow(props.item)}
                />
                <View style={styles.flex1}>
                    <View style={[styles.flex1, styles.justifyContentBetween, styles.sidebarLinkInner, styles.optionRow, props.isFocused && styles.sidebarLinkActive]}>
                        <View style={[styles.flex1, styles.alignItemsStart]}>
                            <Text
                                style={[
                                    styles.optionDisplayName,
                                    props.isFocused ? styles.sidebarLinkActiveText : styles.sidebarLinkText,
                                    props.item.isSelected && styles.sidebarLinkTextBold,
                                ]}
                            >
                                {props.item.text}
                            </Text>

                            {Boolean(props.item.alternateText) && (
                                <Text style={[props.isFocused ? styles.sidebarLinkActiveText : styles.sidebarLinkText, styles.optionAlternateText, styles.textLabelSupporting]}>
                                    {props.item.alternateText}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
                {props.item.isAdmin && (
                    <View style={[styles.badge, styles.peopleBadge]}>
                        <Text style={[styles.peopleBadgeText]}>{props.translate('common.admin')}</Text>
                    </View>
                )}
            </PressableWithFeedback>
            {!_.isEmpty(errors[item.accountID]) && (
                <FormHelpMessage
                    isError
                    message={errors[item.accountID]}
                />
            )}
        </>
    );
}

CheckboxListItem.displayName = 'CheckboxListItem';
CheckboxListItem.propTypes = propTypes;
CheckboxListItem.defaultProps = defaultProps;

export default withLocalize(CheckboxListItem);
