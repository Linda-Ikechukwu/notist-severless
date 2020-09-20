import * as React from 'react';
import { useHistory } from "react-router-dom";
import { Box, Heading, Text} from "@chakra-ui/core";

const NoteCard = ({ noteTitle, noteBody, noteId, createdAt}) => {

    const history = useHistory();

    const handleCardClick = (event) => {
        event.preventDefault();
        history.push(`/notes/${noteId}`);
    }

    return (
        <div>
            <Box pos="relative" h="110px" borderWidth="1px" rounded="lg" overflow="hidden" onClick={handleCardClick} mb="20px" p="10px" cursor="pointer">
                <Heading as="h4" size="md">
                    {noteTitle}
                </Heading>
                <Text fontSize="sm"> Created: {new Date(createdAt).toLocaleString()}</Text>
                <Text height={32} isTruncated >
                    {noteBody}
                </Text>

            </Box>

        </div>
    )
}

export default NoteCard;