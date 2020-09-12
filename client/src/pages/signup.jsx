//Show confirmation code button if there is a user and show signup form if there isn't

import React, { useState } from 'react';

import { useHistory, Link } from "react-router-dom";

import {
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Input,
    Button,
    Flex,
    Text
} from "@chakra-ui/core";

import { Auth } from "aws-amplify";

import { useAppContext } from "../libs/context";

const SignUp = () => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [user, setUser] = useState(null);

    const [isSubmitting, setIsSubmiting] = useState(false);

    const [errors, setErrors] = useState({ emailError: "Please enter a valid email address", passwordError: "" });



    const validateForm = () => {
        if (email.length < 9) {
            setErrors({ ...errors, emailError: "Please enter a valid email address" });
        } else if (password.length < 5) {
            setErrors({ ...errors, passwordError: "Password must be more than 5 letters" });
        }
        alert(errors.passwordError);
        return errors;
    }

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        setIsSubmiting(true);

        try {
            const newUser = await Auth.signUp({
                username: email,
                password: password,
            });
            setIsSubmiting(false);
            setUser(newUser);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            history.push("/confirm");

        } catch (e) {
            alert(e.message);
            setIsSubmiting(false);
        }
    }

    const validateFormInput = () => {
        return email.length > 0 && password.length > 7 & confirmPassword === password;
    }

    return (
        <div>
            <Flex direction="column" align="center" justify="center" mt="100px">
               <Text fontSize="3xl" mb="10px">Sign Up</Text>
                <form onSubmit={handleSignUpSubmit} className="form" >
                    <FormControl isRequired>
                        <FormLabel htmlFor="email">Email address</FormLabel>
                        <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <FormErrorMessage>{errors.emailError}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="name">Password</FormLabel>
                        <Input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <FormErrorMessage>{errors.passwordError}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="name">Confirm Password</FormLabel>
                        <Input type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        <FormErrorMessage>{errors.passwordError}</FormErrorMessage>
                    </FormControl>
                    <Button
                        mt={4}
                        variantColor="yellow"
                        isLoading={isSubmitting}
                        type="submit"
                        isDisabled={!validateFormInput()}
                    >
                        Sign Up
                   </Button>
                </form>

                <Text fontSize="sm" as="i" mt="30px">Already have an account? <Link to="/login">Login</Link> .</Text>
            </Flex>
        </div>
    )
}

export default SignUp;