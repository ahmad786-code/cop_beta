import { useState } from 'react';
import auth from '@react-native-firebase/auth';

const useForm = (initialValues) => {
    const [formState, setFormState] = useState(initialValues);

    const handleInputChange = (name, value) => {
        setFormState({...formState, [name]: value});
    };

    const handleSignUp = async () => {
        const { email, password } = formState;
        if (email && password) {
            try {
                await auth().createUserWithEmailAndPassword(email, password);
                // Handle successful sign up, e.g., navigating to another screen
            } catch (error) {
                // Handle errors here
                console.error(error);
            }
        }
    };

    return {
        formState,
        handleInputChange,
        handleSignUp
    };
};
