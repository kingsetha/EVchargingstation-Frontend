import { ActionType } from "./ActionType";

const initialState = {
    users: [],
    currentUser: null,
    error: null
};

export const getAllReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.GETALL:
            return {
                ...state,
                users: action.payload
            };
        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case ActionType.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case ActionType.REGISTER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case ActionType.REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
