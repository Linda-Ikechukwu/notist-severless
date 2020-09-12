//Show confirmation code button if there is a user and show signup form if there isn't

import React, { useState } from 'react';

import {
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Input,
    Button,
    Flex
} from "@chakra-ui/core";

import { Auth } from "aws-amplify";

import { useAppContext } from "../libs/context";

const SignUp = () => {

    const history = useHistory();

    const { userHasAuthenticated } = useAppContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");

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
                username: fields.email,
                password: fields.password,
            });
            setIsSubmiting(false);
            setUser(newUser);
        } catch (e) {
            alert(e.message);
            setIsSubmiting(false);
        }
    }

    const handleConfirmationSubmit = async (event) => {
        event.preventDefault();
        setIsSubmiting(true);

        try {
            await Auth.confirmSignUp(email, confirmationCode);
            await Auth.signIn(email, password);

            userHasAuthenticated(true);
            history.push("/");

          } catch (e) {
            alert(e.message);
            setIsLoading(false);
          }

    }

    const validateFormInput = () => {
        return email.length > 0 && password.length > 0 & confirmPassword === password;
    }

    const validateConfirmationForm = () => {
        return confirmationCode.length > 0;
    }

    const confirmationForm = () => {
        return (
            <div>
                <Flex direction="column" align="center" justify="center" mt="100px">
                    <form onSubmit={handleConfirmationSubmit} className="form" >
                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Confirmation Code</FormLabel>
                            <Input
                              type="text"
                              id="confirm-code"
                              aria-describedby="confirm-helper-text"
                              value={confirmationCode}
                              onChange={e => setConfirmationCode(e.target.value)}
                            />
                            <FormErrorMessage></FormErrorMessage>
                            <FormHelperText id="confirm-helper-text">
                                Please Check your email for code
                            </FormHelperText>
                        </FormControl>
                        <Button
                            mt={4}
                            variantColor="yellow"
                            isLoading={isSubmitting}
                            type="submit"
                            isDisabled={!validateConfirmationForm()}
                        >
                            Sign Up
                   </Button>
                    </form>
                </Flex>
            </div>
        )
    }


    const signUpForm = () => {
        return (
            <div>
                <Flex direction="column" align="center" justify="center" mt="100px">
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
                </Flex>
            </div>
        )
    }

    return (
        <>
          {newUser === null ? signUpForm() : confirmationForm()}
        </>
    )
}

export default SignUp;