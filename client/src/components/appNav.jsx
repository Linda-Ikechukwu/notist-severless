import * as React from 'react';
import {Link} from 'react-router-dom';

import { Heading, Flex, IconButton, Button } from "@chakra-ui/core";

import { Auth } from "aws-amplify";

import { useAppContext } from "../libs/context";

const AppNav = ({authStatus}) => {

    const { userHasAuthenticated } = useAppContext();

    const handleLogout = async() => {
        await Auth.signOut();
        userHasAuthenticated(false);
    }

    return (
        <nav>
            {
                authStatus?
                <Button variantColor="black" variant="ghost" ml="185px" onClick={handleLogout}>
                   Logout
                </Button>
                : " "
            }

            <Flex align="center" justify="space-between" mb="20px">
                <Heading as="h2" size="lg" fontStyle="italic">
                   <Link as={Link} to="/">Notist</Link>
                </Heading>
                <IconButton as="a" aria-label="See all Notes" icon="drag-handle">
                   <Link as={Link} to="/notes"> </Link>
                </IconButton>

            </Flex>


        </nav>
    )
}

export default AppNav;