export const RESET_STATE = "RESET_STATE";

export const RESET_MOVIES_STATE = "RESET_MOVIES_STATE";

export const RESET_STATE_USERS = "RESET_STATE_USERS";

export const resetState = () => ({
    "type": RESET_STATE
});

export const resetStateUsers= () => ({
    "type": RESET_STATE_USERS
});
export const resetMoviesState = () => ({
    "type": RESET_MOVIES_STATE
});