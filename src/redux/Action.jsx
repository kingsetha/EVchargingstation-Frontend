import { ActionType } from "./ActionType";


export const getAll = (data) => {
    return {
        type: ActionType.GETALL,
        payload: data
    };
};

export const loginSuccess = (user) => ({
    type: ActionType.LOGIN_SUCCESS,
    payload: user
});

export const loginFailure = (error) => ({
    type: ActionType.LOGIN_FAILURE,
    payload: error
});

export const registerSuccess = (user) => ({
    type: ActionType.REGISTER_SUCCESS,
    payload: user
});

export const registerFailure = (error) => ({
    type: ActionType.REGISTER_FAILURE,
    payload: error
});
