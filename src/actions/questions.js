import {_saveQuestion, _saveQuestionAnswer} from "../_DATA";

const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
const ANSWER_QUESTION = 'ANSWER_QUESTION';
const ADD_QUESTION = 'ADD_QUESTION';

const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions: questions
    }
}

const answerQuestion = (qid, authedUser, isOptionOne) => {
    return {
        type: ANSWER_QUESTION,
        questionId: qid,
        authedUser: authedUser,
        isOptionOne: isOptionOne
    }
}

const handleAnswerQuestion = (qid, authedUser, isOptionOne) => {
    let answer = isOptionOne ? 'optionOne' : 'optionTwo';
    return (dispatch) => {
        return _saveQuestionAnswer({authedUser, qid, answer}).then(
            () => dispatch(answerQuestion(qid, authedUser, isOptionOne))
        )
    }
}

const addQuestion = (question) => {
    return {
        type: ADD_QUESTION,
        question: question
    }
}

const handleAddQuestion = (question) => {
    return (dispatch) => {
        return _saveQuestion(question).then(
            (question) => dispatch(addQuestion(question))
        )
    }
}

export {
    RECEIVE_QUESTIONS, receiveQuestions,
    ANSWER_QUESTION, handleAnswerQuestion,
    ADD_QUESTION, handleAddQuestion,
};
