import React from 'react';
import { connect } from "react-redux";
import { logout } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class LogoutPage extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(logout());
    }

    render(){
        if(this.props.authedUser === null){
            return <Redirect to="/" />
        } else {
            return <div>Logging out...</div>
        }
    }
}

const mstp = (state) => {
    return {
        authedUser: state.authedUser
    }
}

export default connect(mstp)(LogoutPage)
