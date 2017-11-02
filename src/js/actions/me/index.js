import {
    ME_SET_INFO
} from '../../constants/me';

export const setInfo = (name, id) => ({
    type: ME_SET_INFO,
    name,
    id
});
