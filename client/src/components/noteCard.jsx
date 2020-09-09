import * as React from 'react';
import { useHistory } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/core";

const NoteCard = () => {

    const history = useHistory();

    const handleCardClick = (event) => {
        event.preventDefault();
        const noteTitle = 'demo'
        history.push(`/notes/${noteTitle}`);
    }

    return (
        <div>
            <Box h="100px" borderWidth="1px" rounded="lg" overflow="hidden" onClick={handleCardClick} mb="20px" p="10px" cursor="pointer">
                <Heading as="h4" size="md">
                    In love with React & Next
                </Heading>
                <Text height={32} isTruncated >
                    Lorem ipsum is placeholder text commonly used in the graphic, print, and
                    publishing industries for previewing layouts and visual mockups.
                </Text>
            </Box>
        </div>
    )
}

export default NoteCard;