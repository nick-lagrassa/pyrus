import {
    ME_SET_NAME
} from '../../constants/me';

const initialState = {
    name: '',
    id: ''
};

export default function me(state=initialState, action) {
    switch (action.type) {
        case ME_SET_NAME:
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
