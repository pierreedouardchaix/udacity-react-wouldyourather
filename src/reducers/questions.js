import {ADD_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS} from "../actions/questions";

const questions = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION:
            const {questionId, authedUser, isOptionOne} = action;
            return {
                ...state,
                [questionId]: {
                    ...state[questionId],
                    [isOptionOne ? 'optionOne' : 'optionTwo']: {
                        ...state[questionId][isOptionOne ? 'optionOne' : 'optionTwo'],
                        votes: state[questionId][isOptionOne ? 'optionOne' : 'optionTwo'].votes.concat([authedUser])
                    }
                }
            }
        case ADD_QUESTION:
            const {question} = action;
            return {
                ...state,
                [question.id]: question
            }
        default:
            return state;
    }
}

export default questions;
