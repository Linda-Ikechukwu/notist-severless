import React, { useState, useEffect } from 'react';
import { useHistory,useParams, Link } from "react-router-dom";
import { Box, Heading, Skeleton, Text } from "@chakra-ui/core";

import SearchInput from '../components/searchInput'
import BackButton from '../components/backButton';
import NoteCard from '../components/noteCard';

//requests to API are authorized by IAM. Amplify takes care of that using the current user session
import { API } from "aws-amplify";

const AllNotes = () => {

    const [notes, setNotes] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const { id } = useParams();
    const history = useHistory();

    const handleBackButtonClick = () => {
        history.push(`/`);
    }

    const deleteNote = async() => {
        return API.del("notes", `/notes/${id}`).then(response => response).catch(error => console.log(error.response.data));
    }

    const handleDeleteNote = async(event)=> {
        event.preventDefault();

        const confirmed = window.confirm(
          "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
          return;
        }

        setIsDeleting(true);

        try {
          await deleteNote();
          history.go();

        } catch (e) {
          alert(e);
          setIsDeleting(false);
        }
    }

    const loadNotes = async() => {
        return API.get("notist", "/notes").then(response => response).catch(error => console.log(error.response.data));
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
            <Skeleton height="100px" my="10px" />
            <Skeleton height="100px" my="10px" />
            <Skeleton height="100px" my="10px" />
        </div>
    )

    return (

        <>
            {notes === null
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
                                  handleDeleteNote={handleDeleteNote}
                                  isLoading={isDeleting}
                                />
                            ))
                        }
                    </Box>
                </>
                :

                <Text fontSize="sm" as="i" mt="30px">You haven't written any notes.<Link to="/"> Write one</Link>.</Text>

           }

        </>

    )
}

export default AllNotes;