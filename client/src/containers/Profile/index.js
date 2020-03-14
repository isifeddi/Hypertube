import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import Profile from '../../components/Profile/';
import { editInfo ,sendImage} from '../../actions/profileAction';


const validate = (values) => {
    const errors = {};
    const requiredFields = [
        "firstname",
        "lastname",
        "username",
        "email",
    ];

    requiredFields.forEach(field => {
        if (!values[field] || !values[field].trim()) {
            errors[field] = 'Required !';
        }
    });
    if (values.firstname && !/^[a-zA-Z]{2,20}$/.test(values.firstname))
        errors.firstname = 'Firstname can contain 2-20 characters, letters (a-z)';
    if (values.lastname && !/^[a-zA-Z]{2,20}$/.test(values.lastname))
        errors.lastname = 'Lastname can contain 2-20 characters, letters (a-z)';
    if (values.username && !/^[a-z0-9_-]{2,20}$/.test(values.username))
        errors.username = 'Username can contain 2-20 characters, letters (a-z), numbers, "_" and "-"';
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
        errors.email = "Invalid email address !";
    if (values.password && !/\d/.test(values.password))
        errors.password = "Password must contain a number !";
    else if (values.password && !/[A-Z]/.test(values.password))
        errors.password = "Password must contain an uppercase letter !";
    else if (values.password && !/[a-z]/.test(values.password))
        errors.password = "Password must contain a lowercase letter !";
    else if (values.password && !/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(values.password))
        errors.password = "Password must contain a special character !";
    else if (values.password && !/[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]{8,20}/.test(values.password))
        errors.password = "Password must contain at least 8 characters !";
    if ('password' in values && !values.confirmPassword)
        errors.confirmPassword = "Required !";
    if (values.confirmPassword && values.password !== values.confirmPassword)
        errors.confirmPassword = "Passwords does not match !";
    return errors;
}

const mapStateToProps = (state) => ({
    user: state.user,
});
const mapDispatchToProps = {
    "editInfo": editInfo,
    "sendImage" :sendImage
};
const mergeProps = (stateProps, dispatchProps, otherProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...otherProps,
    
    
    "handleSubmit": otherProps.handleSubmit((values) => {
        dispatchProps.editInfo(values);
        delete values.password;
        delete values.confirmPassword;
    }),
    "fileChangedHandler" : (event) => {
        let files  = event.target.files[0];
        const formData = new FormData();
        formData.append('files',files);
        formData.append('user_id',stateProps.user.id);
        dispatchProps.sendImage(formData);
        event.target.value = null;
    } 
});

let  profileContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Profile);

profileContainer = reduxForm({
    'form': 'profile',
    validate,
})(profileContainer);

profileContainer = connect(
    state => ({
        initialValues: {
            firstname: state.user.firstname,
            lastname: state.user.lastname,
            username: state.user.username,
            email: state.user.email,
            langue: state.user.langue,
        },
    }),
)(profileContainer);

export default profileContainer;
