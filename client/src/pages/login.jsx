import React, { useState } from 'react';

import { useHistory, Link } from "react-router-dom";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Flex,
    Text
} from "@chakra-ui/core";

import { Auth } from "aws-amplify";

import { useAppContext } from "../libs/context";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmiting] = useState(false);
    const [errors, setErrors] = useState({ emailError: "Please enter a valid email address", passwordError: "" });

    const { userHasAuthenticated } = useAppContext();

    const history = useHistory();

    const validateForm = () => {
        if (email.length < 9) {
            setErrors({ ...errors, emailError: "Please enter a valid email address" });
        } else if (password.length < 5) {
            setErrors({ ...errors, passwordError: "Password must be more than 5 letters" });
        }
        alert(errors.passwordError);
        return errors;
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsSubmiting(true);
        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            alert(e.message);
            setIsSubmiting(false);
        }
    }

    const validateInput = () => {
        return email.length > 0 && password.length > 0;
    }

    return (
        <div>
            <Flex direction="column" align="center" justify="center" mt="100px">
                <Text fontSize="3xl" mb="10px">Login</Text>
                <form onSubmit={handleSubmit} className="form" >
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
                    <Button
                        mt={4}
                        variantColor="yellow"
                        type="submit"
                        isDisabled={!validateInput()}
                        isLoading={isSubmitting}
                    >
                        Login
                   </Button>
                </form>
                <Text fontSize="sm" as="i" mt="30px">Don't have an account yet? <Link to="/signup">Sign Up</Link> .</Text>
            </Flex>
        </div>
    )
}

export default Login;