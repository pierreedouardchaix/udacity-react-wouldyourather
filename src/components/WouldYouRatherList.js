import React, { Fragment } from "react";
import {connect} from "react-redux";
import WouldYouRatherCard from "./WouldYouRatherCard";
import Switch from "react-switch";
import Header from "./Header";
import Nav from "./Nav";

class WouldYouRatherList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowAnswered: false
        }
    }

    switchWYRList = () => {
        this.setState(({shouldShowAnswered}) => ({
            shouldShowAnswered: !shouldShowAnswered
        }))
    }

    render() {
        const wyrToShow = this.state.shouldShowAnswered ? this.props.answeredQuestionIds : this.props.unansweredQuestionIds;
        const {authedUser, authedUserAvatarURL} = this.props;
        return (
            <Fragment>
                <Header authedUser={authedUser} authedUserAvatarURL={authedUserAvatarURL}/>
                <Nav/>
                <div className="flex justify-center flex-col pt-12">

                    <div className="flex justify-center items-center w-full">
                    <span className="text-md pr-4 w-72">
                        Now showing {this.state.shouldShowAnswered ? "" : "un"}answered questions
                    </span>
                        <Switch
                            onChange={this.switchWYRList}
                            checked={this.state.shouldShowAnswered}
                            checkedIcon={false}
                            uncheckedIcon={false}
                        />
                    </div>

                    <div className="flex justify-center flex-wrap">
                        {wyrToShow.length === 0 ?
                            <div className="pt-8">No question to show in this section.</div>
                            : null
                        }
                        {wyrToShow.map((id) => <WouldYouRatherCard key={id} id={id}/>)}
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mstp = (state) =>
{
    const {authedUser, users, questions} = state;

    const authedUserAnsweredQuestionIds = (authedUser !== null) ? Object.keys(users[authedUser].answers) : [];

    return {
        answeredQuestionIds: Object.keys(questions).filter(
            (q) => authedUserAnsweredQuestionIds.includes(q)).sort(
            (q1, q2) => questions[q2].timestamp - questions[q1].timestamp
        ),
        unansweredQuestionIds: Object.keys(questions).filter(
            (q) => !authedUserAnsweredQuestionIds.includes(q)).sort(
            (q1, q2) => questions[q2].timestamp - questions[q1].timestamp
        ),
        authedUser: authedUser,
        authedUserAvatarURL: users[authedUser].avatarURL
    }
}

const ConnectedWouldYouRatherList = connect(mstp)(WouldYouRatherList);

export default ConnectedWouldYouRatherList;
