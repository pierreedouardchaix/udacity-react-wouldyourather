import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const WouldYouRatherAuthor = ({author, authorAvatarURL}) => (
    <div className="flex h-16 w-64 justify-between px-8 items-center">
        <div className="text-xs">
            Asked by {author}
        </div>
        <div className="flex items-center w-12 h-12">
            <img alt="Author" src={authorAvatarURL} className="rounded-full"/>
        </div>
    </div>
)

class WouldYouRatherCard extends React.Component {
    render(){
        const {question, id, authorAvatarURL} = this.props;
        return (
            <div className="flex flex-col w-64 rounded-lg border-blue-600 border-2 m-8">
                <Link to={`/questions/${id}`}>
                    <div className="flex justify-center rounded-t-lg items-center h-16 bg-blue-100 font-semibold">
                        Would you rather...
                    </div>
                    <div className="flex p-4 justify-center items-center text-center h-16 font-light">
                        ... {question.optionOne.text}?
                    </div>
                    <div className="flex justify-center items-center text-center h-12">
                        OR
                    </div>
                    <div className="flex p-4 justify-center items-center h-16 text-center font-light">
                        ... {question.optionTwo.text}?
                    </div>
                    <WouldYouRatherAuthor
                        author={question.author}
                        authorAvatarURL={authorAvatarURL}
                        />
                </Link>
            </div>
        )
    }
}

const mstp = (state, props) => {
    const {questions, authedUser, users} = state;

    return {
        id: props.id,
        question: questions[props.id],
        authedUser: authedUser,
        authorAvatarURL: users[questions[props.id].author].avatarURL
    }
}

export default connect(mstp)(WouldYouRatherCard);
export {WouldYouRatherAuthor};
