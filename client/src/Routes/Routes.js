import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from 'react-router-dom';
import RegisterContainer from '../containers/Register';
import loginContainer from '../containers/Login';
import NotFoundPage from '../components/NotFoundPage';
import ForgotPasswordContainer from '../containers/sendEmail';
import EmailConfirmCont from '../containers/emailConfirmation';
import ResetPasswordContainer from '../containers/resetPassword';
import HomeContainer from '../containers/Home';

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/confirmation/:token"  component={EmailConfirmCont}/>
                <Route exact path="/resetPassword/:token"  component={ ResetPasswordContainer}/>
                <Route exact path="/forgotPassword"  component={ ForgotPasswordContainer}/>
                <Route exact path="/register"  component={ RegisterContainer} />
                <Route exact path="/login"  component={ loginContainer}/>
                <Route exact path="/"  component={ HomeContainer}/>
                <Route path="" component={NotFoundPage}/>
            </Switch>
        </>
    )
}
const mapStateToProps = (state) => (
{
    'user': state.user,
});
export default connect(mapStateToProps)(Routes);