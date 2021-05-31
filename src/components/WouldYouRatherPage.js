import {connect} from "react-redux";
import React, {Fragment} from "react";
import {handleAnswerQuestion} from "../actions/questions";
import {WouldYouRatherAuthor} from "./WouldYouRatherCard";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Nav from "./Nav";

class WouldYouRatherOption extends React.Component {
    render() {
        return (
            <div onClick={this.props.submitVote} className="flex flex-col items-center py-8 px-4">
                <div className="flex items-top">
                    <div
                        className={`${this.props.userHasAnswered ? (this.props.isUserChoice ? "font-semibold underline-answer" : "text-gray-400 font-light") : ""} pr-2 pb-4 justify-center items-center text-center`}>
                        ... {this.props.text}?
                    </div>
                    <div className={this.props.isUserChoice ? "" : "hidden"}>
                        <FontAwesomeIcon icon={faCheckCircle} color="#abc012"/>
                    </div>
                </div>
                <div className="text-xs">
                    {this.props.userHasAnswered ? `${this.props.nVotes} vote${this.props.nVotes > 1 ? 's' : ''} (${this.props.pct.toFixed(1)}%)` : "Please make a choice to reveal statistics."}
                </div>
            </div>
        )
    }
}

class WouldYouRatherPage extends React.Component {

    submitVote(isOptionOne) {
        if (this.props.userHasAnswered) {
            return
        }
        const {dispatch, id, authedUser} = this.props;
        console.log(this.props);
        dispatch(handleAnswerQuestion(id, authedUser, isOptionOne));
    }

    render() {

        const {authedUser, authedUserAvatarURL} = this.props;

        if(this.props.questionNotFound){
            return(
                <Fragment>
                    <Header authedUser={authedUser} authedUserAvatarURL={authedUserAvatarURL}/>
                    <div className="flex items-center justify-center">
                        <h2 className="mt-4 font-bold text-lg">404: The question you requested could not be found.</h2>
                    </div>
                </Fragment>
            )
        }

        const optionOneVotes = this.props.question.optionOne.votes.length;
        const optionTwoVotes = this.props.question.optionTwo.votes.length;
        const optionOnePct = 100 * optionOneVotes / (optionOneVotes + optionTwoVotes);
        const optionTwoPct = 100 * optionTwoVotes / (optionOneVotes + optionTwoVotes);

        return (
            <Fragment>
                <Header authedUser={authedUser} authedUserAvatarURL={authedUserAvatarURL}/>
                <Nav/>
                <div className="bg-gray-100 w-full flex justify-center items-center">
                    <div className="w-96 bg-white rounded-md border-gray-700 shadow-xl flex flex-col items-center my-20">
                        <div className="flex justify-center rounded-t-lg items-center h-16 font-semibold">
                            Would you rather...
                        </div>
                        <WouldYouRatherOption
                            text={this.props.question.optionOne.text}
                            userHasAnswered={this.props.userHasAnswered}
                            isUserChoice={this.props.answer === 'optionOne'}
                            nVotes={optionOneVotes}
                            pct={optionOnePct}
                            submitVote={(e) => this.submitVote(true)}
                        />
                        <div>
                            OR
                        </div>
                        <WouldYouRatherOption
                            text={this.props.question.optionTwo.text}
                            userHasAnswered={this.props.userHasAnswered}
                            isUserChoice={this.props.answer === 'optionTwo'}
                            nVotes={optionTwoVotes}
                            pct={optionTwoPct}
                            submitVote={(e) => this.submitVote(false)}
                        />
                        <WouldYouRatherAuthor
                            author={this.props.question.author}
                            authorAvatarURL={this.props.authorAvatarURL}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mstp = ({questions, users, authedUser}, props) => {

    const {question_id} = props.match.params;

    if(!questions[question_id]){
        return {
            questionNotFound: true,
            authedUser: authedUser,
            authedUserAvatarURL: users[authedUser].avatarURL,
        }
    }

    const question = questions[question_id];
    const author = question.author;
    const authorAvatarURL = users[author].avatarURL;

    return {
        id: question_id,
        question: question,
        authedUser: authedUser,
        authedUserAvatarURL: users[authedUser].avatarURL,
        userHasAnswered: Object.keys(users[authedUser].answers).includes(question_id),
        answer: users[authedUser].answers[question.id],
        authorAvatarURL: authorAvatarURL,
        questionNotFound: false
    }
}

export default connect(mstp)(WouldYouRatherPage);
