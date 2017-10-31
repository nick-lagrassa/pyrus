import {
    ME_SET_NAME
} from '../../constants/me';

export const setName = name => ({
    type: ME_SET_NAME,
    name
});
