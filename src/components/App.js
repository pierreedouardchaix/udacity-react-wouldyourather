import React from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import WouldYouRatherList from "./WouldYouRatherList";
import WouldYouRatherPage from "./WouldYouRatherPage";
import NewWYRPage from "./NewWYRPage";
import { BrowserRouter, Route } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import { PrivateRoute } from "./PrivateRoute";

class App extends React.Component {

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(handleInitialData());
    }

    render() {
        return (
            <BrowserRouter>
                <div className="h-screen">
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/logout" exact component={LogoutPage} />
                    <PrivateRoute
                        path="/"
                        exact
                        authedUser={this.props.authedUser}
                        component={WouldYouRatherList}
                    />
                    <PrivateRoute
                        path="/questions/:question_id"
                        authedUser={this.props.authedUser}
                        component={WouldYouRatherPage}
                    />
                    <PrivateRoute
                        path="/add"
                        exact
                        authedUser={this.props.authedUser}
                        component={NewWYRPage}
                    />
                    <PrivateRoute
                        path="/leaderboard"
                        exact
                        authedUser={this.props.authedUser}
                        component={Leaderboard}/>
                </div>
            </BrowserRouter>
        );
    }
}

const mstp = (state) => {
    const {authedUser, users} = state;

    return {
        authedUser: authedUser,
        authedUserAvatarURL: authedUser && users[authedUser].avatarURL,
        loading: authedUser === null
    }
}

export default connect(mstp)(App);

