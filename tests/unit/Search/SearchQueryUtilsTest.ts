/* eslint-disable @typescript-eslint/naming-convention */
// we need "dirty" object key names in these tests
import {getQueryWithUpdatedValues} from '@src/libs/SearchQueryUtils';

const personalDetailsFakeData = {
    'johndoe@example.com': {
        accountID: 12345,
    },
    'janedoe@example.com': {
        accountID: 78901,
    },
} as Record<string, {accountID: number}>;

jest.mock('@libs/PersonalDetailsUtils', () => {
    return {
        getPersonalDetailByEmail(email: string) {
            return personalDetailsFakeData[email];
        },
    };
});

// The default query is generated by default values from parser, which are defined in grammar.
// We don't want to test or mock the grammar and the parser, so we're simply defining this string directly here.
const defaultQuery = `type:expense status:all sortBy:date sortOrder:desc`;

describe('getQueryWithUpdatedValues', () => {
    test('returns default query for empty value', () => {
        const userQuery = '';

        const result = getQueryWithUpdatedValues(userQuery);

        expect(result).toEqual(defaultQuery);
    });

    test('returns query with updated amounts', () => {
        const userQuery = 'foo test amount:20000';

        const result = getQueryWithUpdatedValues(userQuery);

        expect(result).toEqual(`${defaultQuery} amount:2000000 foo test`);
    });

    test('returns query with user emails substituted', () => {
        const userQuery = 'from:johndoe@example.com hello';

        const result = getQueryWithUpdatedValues(userQuery);

        expect(result).toEqual(`${defaultQuery} from:12345 hello`);
    });

    test('returns query with user emails substituted and preserves user ids', () => {
        const userQuery = 'from:johndoe@example.com to:112233';

        const result = getQueryWithUpdatedValues(userQuery);

        expect(result).toEqual(`${defaultQuery} from:12345 to:112233`);
    });

    test('returns query with all of the fields correctly substituted', () => {
        const userQuery = 'from:9876,87654 to:janedoe@example.com hello amount:150 test';

        const result = getQueryWithUpdatedValues(userQuery);

        expect(result).toEqual(`${defaultQuery} from:9876,87654 to:78901 amount:15000 hello test`);
    });
});
