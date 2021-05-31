import React, {Fragment} from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import Nav from "./Nav";

const IndividualPlayer = ({userInfo, isAuthedUser}) => (
    <li className="w-2/5 py-4 px-4 my-8 bg-blue-50 shadow-md flex flew-col xs:flex-row sm:items-center flex-wrap">
        <img className="w-24 h-24 rounded-full" alt="user" src={userInfo.avatarURL}/>
        <div className="pl-4 w-1/2">
            <p>{userInfo.id}</p>
            {isAuthedUser ?
                <div className="flex items-center justify-center h-4 w-12 px-1 bg-purple-300 text-white text-xs rounded-lg">YOU</div> :
                null }
        </div>
        <div className="flex-col">
            <div>{userInfo.questions.length} questions asked</div>
            <div>{Object.keys(userInfo.answers).length} questions answered</div>
        </div>
    </li>
)


class Leaderboard extends React.Component {
    render() {
        const {userIdsSorted, users, authedUser, authedUserAvatarURL} = this.props
        return (
            <Fragment>
                <Header authedUser={authedUser} authedUserAvatarURL={authedUserAvatarURL}/>
                <Nav/>
                <div className="mt-12">
                    <ul className="w-full flex flex-col items-center">
                        {userIdsSorted.map((uid) => (
                            <IndividualPlayer
                                key={uid}
                                userInfo={users[uid]}
                                isAuthedUser={authedUser === uid}/>
                        ))}
                    </ul>
                </div>
            </Fragment>
        )
    }
}

const userScore = (user) =>
{
    return user.questions.length + Object.keys(user.answers).length;
}

const mstp = (state) =>
{
    const {users, authedUser} = state;

    const userIdsSorted = Object.keys(users).sort(
        (u1, u2) => {
            return userScore(users[u2]) - userScore(users[u1])
        }
    )

    return {
        users: users,
        userIdsSorted: userIdsSorted,
        authedUser: authedUser,
        authedUserAvatarURL: users[authedUser].avatarURL
    }
}

export default connect(mstp)(Leaderboard);
