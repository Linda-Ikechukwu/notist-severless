import * as React from 'react';
import { Link, useHistory } from "react-router-dom";

import { Heading, Flex, IconButton, Button } from "@chakra-ui/core";

import { Auth } from "aws-amplify";

import { useAppContext } from "../libs/context";

const AppNav = ({ authStatus }) => {

    const { userHasAuthenticated } = useAppContext();

    const history = useHistory();

    const handleLogout = async () => {
        await Auth.signOut();

        userHasAuthenticated(false);

        history.push("/login");
    }

    return (
        <nav>
            {
                authStatus ?
                    <Button variantColor="black" fontStyle="italic" variant="ghost" ml="185px" onClick={handleLogout}>
                        Logout
                    </Button>
                    : " "
            }

            <Flex align="center" justify="space-between" mb="20px">
                <Heading as="h2" size="lg" fontStyle="italic">
                    <Link as={Link} to="/">Notist</Link>
                </Heading>
                <Link as={Link} to="/notes">
                    <IconButton as="a" aria-label="See all Notes" icon="drag-handle">
                    </IconButton>
                </Link>

            </Flex>


        </nav>
    )
}

export default AppNav;