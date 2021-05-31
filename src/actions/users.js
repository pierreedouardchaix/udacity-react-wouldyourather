const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users: users
    }
}

export {RECEIVE_USERS, receiveUsers};
