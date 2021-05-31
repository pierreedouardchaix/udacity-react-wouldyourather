import {connect} from "react-redux";
import React, {Fragment} from "react";
import {handleAddQuestion} from "../actions/questions";
import {Redirect} from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

class NewWYRPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            optionOneText: '',
            optionTwoText: '',
            toHome: false
        }
    }

    handleChange = (e, option) => {
        e.preventDefault();
        this.setState((state) => (
            {
                ...state,
                [option]: e.target.value
            }
        ))
    }

    addNewWYR = () => {
        const {dispatch, authedUser} = this.props;
        dispatch(handleAddQuestion(
            {
                author: authedUser,
                optionOneText: this.state.optionOneText,
                optionTwoText: this.state.optionTwoText
            }
        ))

        // Redirect to home page
        this.setState({toHome: true});
    }

    render() {
        const {toHome} = this.state;

        if (toHome) {
            return (
                <Redirect to="/"/>
            )
        }

        const {authedUser, authedUserAvatarURL} = this.props;

        return (
            <Fragment>
                <Header authedUser={authedUser} authedUserAvatarURL={authedUserAvatarURL}/>
                <Nav/>
                <div className="bg-gray-100 w-full flex justify-center items-center">
                    <div className="w-96 bg-white rounded-md border-gray-700 shadow-xl flex flex-col items-center my-20">
                        <div className="flex justify-center rounded-t-lg items-center h-16 font-semibold w-full">
                            Would you rather...
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.addNewWYR()
                        }} className="w-full flex flex-col items-center">
                            <div className="flex flex-col w-2/3 my-4">
                                <label className="block text-sm mb-2">
                                    Enter text for option one:
                                </label>
                                <input
                                    type="text"
                                    placeholder="... do this?"
                                    className="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => this.handleChange(e, 'optionOneText')}
                                    value={this.state.optionOne}
                                />
                            </div>
                            <div className="flex flex-col w-2/3 my-4">
                                <label className="block text-sm mb-2">
                                    Enter text for option two:
                                </label>
                                <input
                                    type="text"
                                    placeholder="... or do that?"
                                    className="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => this.handleChange(e, 'optionTwoText')}
                                    value={this.state.optionTwo}
                                />
                            </div>
                            <div className="flex items-center justify-between my-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    disabled={this.state.optionOneText.length === 0 || this.state.optionTwoText.length === 0}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mstp = ({ questions, users, authedUser}) => {
    return {
        authedUser: authedUser,
        authedUserAvatarURL: users[authedUser].avatarURL
    }
}

export default connect(mstp)(NewWYRPage);
