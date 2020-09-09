import * as React from 'react';
import {Link} from 'react-router-dom';
import { Heading, Flex,Text, IconButton } from "@chakra-ui/core";

const AppNav = () => {
    return (
        <nav>
            <Flex align="center" justify="space-between" mb="20px">
                <Heading as="h2" size="lg" fontStyle="italic">
                   <Link as={Link} to="/">Notist</Link>
                </Heading>
                <Link as={Link} to="/notes">
                    <IconButton as="a" aria-label="See all Notes" icon="drag-handle" />
                </Link>
            </Flex>
            <Text mb="20px">Hey Joe, Whats on your mind today?</Text>


        </nav>
    )
}

export default AppNav;