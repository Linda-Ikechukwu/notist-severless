import React,{useState} from 'react';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Flex
} from "@chakra-ui/core";

import { Auth } from "aws-amplify";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({emailError:"Please enter a valid email address",passwordError:""});



    const validateForm =() =>{
        if(email.length < 9){
            setErrors({ ...errors, emailError:"Please enter a valid email address"});
        }else if(password.length < 5){
            setErrors({ ...errors, passwordError:"Password must be more than 5 letters"});
        }
        alert(errors.passwordError);
        return errors;
    }

    const handleSubmit = async (event)=> {
        event.preventDefault();

        
    }

    const validateInput = () =>{
        return email.length > 0 && password.length > 0;
    }

    return (
        <div>
        <Flex direction="column" align="center" justify="center" mt="100px">
            <form onSubmit={handleSubmit} className="form" >
                <FormControl isRequired>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <FormErrorMessage>{errors.emailError}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="name">Password</FormLabel>
                    <Input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <FormErrorMessage>{errors.passwordError}</FormErrorMessage>
                </FormControl>
                <Button
                    mt={4}
                    variantColor="yellow"
                    isDisabled={!validateInput()}
                >
                    Submit
                </Button>
            </form>
        </Flex>
        </div>
    )
}

export default Login;