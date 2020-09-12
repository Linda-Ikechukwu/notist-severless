import * as React from 'react';
import { useHistory } from "react-router-dom";
import { Box, Heading, Text, IconButton } from "@chakra-ui/core";

const NoteCard = ({noteTitle, noteBody, noteId, createdAt, handleDeleteNote, isLoading}) => {

    const history = useHistory();

    const handleCardClick = (event) => {
        event.preventDefault();
        history.push(`/notes/${noteId}`);
    }

    return (
        <div>
            <Box pos="relative" h="100px" borderWidth="1px" rounded="lg" overflow="hidden" onClick={handleCardClick} mb="20px" p="10px" cursor="pointer">
                <Heading as="h4" size="md">
                    {noteTitle}
                </Heading>
                <Text fontSize="sm"> Created: {new Date(createdAt).toLocaleString()}</Text>
                <Text height={32} isTruncated >
                    {noteBody}
                </Text>
            </Box>
            <IconButton
              pos="absolute"
              bottom="0" right="0"
              variantColor="yellow"
              aria-label="delete"
              icon="delete"
              onClick={handleDeleteNote}
              isLoading={isLoading}
            />
        </div>
    )
}

export default NoteCard;