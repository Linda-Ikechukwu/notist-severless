import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import { Box, Skeleton, Textarea, } from "@chakra-ui/core";

import SendButton from '../components/sendButton';
import BackButton from '../components/backButton';
import DeleteButton from '../components/deleteButton';

import { API } from "aws-amplify";

const Note = () => {

    const { noteId } = useParams();
    const history = useHistory();

    const [noteTitle, setNoteTitle] = useState("");
    const [noteBody, setNoteBody] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [buttonDisplay, setButtonDisplay] = useState(false);


    const handleBackButtonClick = () => {
        history.push(`/notes/`);
    }


    useEffect(() => {

      const loadNote =() => {
        return API.get("notist", `/notes/${noteId}`);
      }

      const onLoad = async() => {

         try {
          const note = await loadNote();
          const { noteTitle, noteBody } = note;

          setNoteTitle(noteTitle);
          setNoteBody(noteBody);

        }catch (e) {
          alert(e.message);
        }

        setIsLoading(false)
      }

      onLoad();
  }, [noteId]);


  //Validate that note isn't empty before button click.
    const validateNote =() =>{
        return noteTitle.length > 3 && noteBody.length > 5
    }


    const updateNote = async(note) => {
        return API.put("notist", `/notes/${noteId}`, {
          body: note
        }).then(response => response).catch(error => console.log(error.response.data));
    }

    const handleUpdateNote= async(event) => {

        event.preventDefault();

        setButtonDisplay(true)
        setIsSending(true);

        try {
          await updateNote({
            noteTitle, noteBody
          });

          history.push("/notes");

        } catch (e) {
          alert(e.message);
          setIsSending(false);
        }
    }



  const deleteNote = async() => {
    return API.del("notist", `/notes/${noteId}`);
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
      history.push('/notes');

    } catch (e) {
      alert(e.message);
      setIsDeleting(false);
    }
}



  if (isLoading) return (
        <div>
            <Skeleton height="40px" my="10px" />
            <Skeleton height="300px" my="10px" />
        </div>
    )

    return (
        <>
        <BackButton handleBackButtonClick={handleBackButtonClick} />

        <Box pos="relative" h="450px" borderWidth="1px" rounded="lg" overflow="hidden" mt="20px" p="10px" overflowY="scroll">

            <Textarea minH="100px" fontWeight="bold" border="none" fontSize="1.5rem"
                value={noteTitle}
                disabled={false}
                onChange={e => setNoteTitle(e.target.value)}
                onFocus={() => setButtonDisplay(true)}

            />

            <Textarea border="none" h="300px"
                value={noteBody}
                disabled={false}
                onChange={e => setNoteBody(e.target.value)}
                onFocus={() => setButtonDisplay(true)}

            />

            {
              buttonDisplay && <SendButton isDisabled={!validateNote()} isLoading={isSending} onClick={handleUpdateNote}/>
            }

            <DeleteButton onClick={handleDeleteNote} isLoading={isDeleting} />

        </Box>
        </>
    )
}

export default Note;