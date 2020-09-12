

import React, { useState } from 'react';

import { useHistory, Link } from "react-router-dom";

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

const ConfirmSignUp = () => {

    const history = useHistory();

    const { userHasAuthenticated } = useAppContext();

    const [confirmationCode, setConfirmationCode] = useState("");

    const [isSubmitting, setIsSubmiting] = useState(false);

    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');

    console.log(userPassword, userEmail);


    const handleConfirmationSubmit = async (event) => {
        event.preventDefault();
        setIsSubmiting(true);

        try {
            await Auth.confirmSignUp(userEmail, confirmationCode);
            await Auth.signIn(userEmail, userPassword);

            userHasAuthenticated(true);
            history.push("/");

          } catch (e) {
            alert(e.message);
            setIsSubmiting(false);
          }

    }



    const validateConfirmationForm = () => {
        return confirmationCode.length > 0;
    }


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
                        Confirm
               </Button>
                </form>

            </Flex>
        </div>
    )
}

export default ConfirmSignUp;