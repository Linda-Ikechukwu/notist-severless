import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Box, Heading, Skeleton, Text } from "@chakra-ui/core";

import SearchInput from '../components/searchInput'
import BackButton from '../components/backButton';
import NoteCard from '../components/noteCard';

//requests to API are authorized by IAM. Amplify takes care of that using the current user session
import { API } from "aws-amplify";

const AllNotes = () => {

    const [notes, setNotes] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    const handleBackButtonClick = () => {
        history.push(`/`);
    }

    const loadNotes = () => {
        return API.get("notist", "/notes");
    }

    //fetch notes from dynamodb on page load
    useEffect(() => {
        async function onLoad() {
            try {
                const notes = await loadNotes();
                setNotes(notes);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, []
    );


    if (isLoading) return (
        <div>
            <Skeleton height="40px" my="10px" />
            <Skeleton height="40px" my="10px" />
            <Skeleton height="40px" my="10px" />
        </div>
    )

    return (

        <>
            {notes
                ?
                <>
                    <SearchInput />
                    <Box>
                        <BackButton handleBackButtonClick={handleBackButtonClick} />
                        <Heading my="20px" as="h3">Your Notes</Heading>
                        {
                            notes.map(note => (
                                <NoteCard
                                  noteId={note.noteId}
                                  noteTitle={note.noteTitle}
                                  noteBody={note.noteBody}
                                  createdAt={note.createdAt}
                                />
                            ))
                        }
                    </Box>
                </>
                :

                <Text fontSize="sm" as="i" mt="30px">You haven't written any notes.<Link to="/">Write one</Link> .</Text>

           }

        </>

    )
}

export default AllNotes;