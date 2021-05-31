const SET_AUTHED_USER = 'SET_AUTHED_USER';
const LOGOUT = 'LOGOUT';

function setAuthedUser(authedUserId){
    return {
        type: SET_AUTHED_USER,
        id: authedUserId
    }
}

function logout() {
    return {
        type: LOGOUT
    }
}

export {SET_AUTHED_USER, setAuthedUser, LOGOUT, logout};
