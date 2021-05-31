import React from 'react';
import {connect} from "react-redux";
import {setAuthedUser} from "../actions/authedUser";
import {withRouter, Redirect} from 'react-router-dom';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenUserId: ''
        };
    }

    loginAsUser = (e) => {
        e.preventDefault();
        if (this.state.chosenUserId === '') {
            return
        }
        const {dispatch} = this.props;
        dispatch(setAuthedUser(this.state.chosenUserId));
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({chosenUserId: e.target.value});
    }

    render() {
        const redirectTo = (this.props.location.state && this.props.location.state.from) ? this.props.location.state.from.pathname : "/";
        if (this.props.authedUser) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <div className="bg-gray-100 w-full h-full flex flex-col justify-center items-center">
                <div className="w-96 bg-white rounded-md border-gray-700 shadow-xl flex flex-col items-center my-20">
                    <p className="text-lg font-semibold py-4">Would you rather...?</p>
                    <div className="py-8">
                        <select name="userId" id="userId" value={this.state.chosenUserId}
                                onChange={(e) => this.handleChange(e)}>
                            <option value="">Select your user ID</option>
                            {this.props.userIds.map((uid) => <option value={uid} key={uid}>{uid}</option>)}
                        </select>
                    </div>
                    <button
                        className="mb-4 bg-grey-light hover:bg-gray-400 border-gray-400 border-2 text-grey-darkest font-bold py-2 px-4 rounded items-center"
                        onClick={(e) => this.loginAsUser(e)}>Login
                    </button>
                </div>
            </div>
        )
    }
}

const mstp = (state, props) => {
    const {authedUser, users} = state;
    return {
        authedUser: authedUser,
        userIds: Object.keys(users),
    }
}

export default withRouter(connect(mstp)(LoginPage));
