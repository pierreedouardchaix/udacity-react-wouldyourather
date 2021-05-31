import {_getUsers, _getQuestions} from "../_DATA";
import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";

function handleInitialData() {
    return (dispatch) => {
        return Promise.all([_getUsers(), _getQuestions() ]).then(([users, questions]) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        })
    }
}

export {handleInitialData};
