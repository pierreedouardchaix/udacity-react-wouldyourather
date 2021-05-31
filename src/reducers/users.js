import {RECEIVE_USERS} from "../actions/users";
import {ANSWER_QUESTION, ADD_QUESTION} from "../actions/questions";

const users = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ANSWER_QUESTION:
            const {questionId, authedUser, isOptionOne} = action;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [questionId]: isOptionOne ? 'optionOne' : 'optionTwo'
                    }
                }
            }
        case ADD_QUESTION:
            const {question} = action;
            return {
                ...state,
                [question.author]: {
                    ...state[question.author],
                    questions: state[question.author].questions.concat([question.id])
                }
            }
        default:
            return state;
    }
}

export default users;
