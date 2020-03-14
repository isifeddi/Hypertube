import Register from '../../components/Register';
import {InscriptionAction} from '../../actions/registerAction';
import {connect} from "react-redux";
import {reduxForm } from 'redux-form';


const validate = (values) => {
    const errors = {};
    const requiredFields = [
        'firstname',
        'lastname',
        'username',
        'email',
        'password',
        'confirmPassword',
    ];

    requiredFields.forEach(field => {
        if (!values[field] || !values[field].trim()) {
            errors[field] = 'Required !';
        }
    });
    if(!values['picture'])
        errors['picture'] = 'Required !';
    if(values.firstname && !/^[a-zA-Z]{2,20}$/.test(values.firstname))
        errors.firstname = 'Firstname can contain 2-20 characters, letters (a-z)';
    if(values.lastname && !/^[a-zA-Z]{2,20}$/.test(values.lastname))
        errors.lastname = 'Lastname can contain 2-20 characters, letters (a-z)';
    if(values.username && !/^[a-z0-9_-]{2,20}$/.test(values.username))
        errors.username = 'Username can contain 2-20 characters, letters (a-z), numbers, "_" and "-"';
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
        errors.email = "Invalid email address !";
    if(values.password && !/\d/.test(values.password))
        errors.password = "Password must contain a number !"
    else if(values.password && !/[A-Z]/.test(values.password))
        errors.password = "Password must contain an uppercase letter !"
    else if(values.password && !/[a-z]/.test(values.password))
        errors.password = "Password must contain a lowercase letter !"
    else if(values.password && !/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(values.password))
        errors.password = "Password must contain a special character !"
    else if(values.password && !/[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]{8,20}/.test(values.password))
        errors.password = "Password must contain 8-20 characters !"
    if(values.confirmPassword && values.password !== values.confirmPassword)
        errors.confirmPassword = "Passwords does not match !"
    return errors;
}


const mapStateToProps = (state) => (
{
    "form" : state.form,
    "user" : state.user,
    "status" : state.register.registerStatus,
    "err": state.register.error,
});
const mapDispatchToProps = {
    "registerAction": InscriptionAction,
};
const mergeProps = (stateProps, dispatchProps, otherProps)=> ({
    ...stateProps,
    ...dispatchProps,
    ...otherProps,
    "handleSubmit" : otherProps.handleSubmit((form)=>{
        const formData = new FormData();
        formData.append('files',form.picture);
        formData.append('lastname',form.lastname);
        formData.append('firstname',form.firstname);
        formData.append('username',form.username);
        formData.append('email',form.email);
        formData.append('password',form.password);

        dispatchProps.registerAction(formData);
    }),
    "fileChangedHandler" : (event,input) => {
        let files  = event.target.files[0];
        input.onChange(files);
        event.target.value = null;
    } 
});

const connectedRegisterContainer = connect(mapStateToProps, mapDispatchToProps,mergeProps)(Register);
const RegisterContainer = reduxForm({
    form : "register",
    "destroyOnUnmount": true,  
    validate,
})(connectedRegisterContainer);

export default RegisterContainer;




