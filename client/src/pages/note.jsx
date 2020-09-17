import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import { Box, Skeleton, Textarea, Input } from "@chakra-ui/core";

import SendButton from '../components/sendButton';

import BackButton from '../components/backButton';

import { API } from "aws-amplify";

const Note = () => {

    const { id } = useParams();

    const history = useHistory();

    const [note, setNote] = useState(null);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteBody, setNoteBody] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);


    const [buttonDisplay, setButtonDisplay] = useState(false);

    const handleBackButtonClick = () => {
        history.push(`/notes/`);
    }


    //Validate that note isn't empty before button click.
    const validateNote =() =>{
        return noteTitle.length > 3 && noteBody.length > 5
    }

    const updateNote = async(note) => {
        return API.put("notist", `/notes/${id}`, {
          body: note
        }).then(response => response).catch(error => console.log(error.response.data));
    }

    const handleUpdateNote= async(event) => {

        event.preventDefault();

        setIsSending(true);

        try {
          await updateNote({
            noteTitle, noteBody
          });

          history.push("/notes");

        } catch (e) {

          alert(e);
          setIsSending(false);
        }
      }

    useEffect(() => {

        const loadNote =() => {
          return API.get("notist", `/notes/${id}`);
        }

        const onLoad = async() => {

           try {
            const note = await loadNote();
            const { noteTitle, noteBody } = note;

            setNoteTitle(noteTitle);
            setNoteBody(noteBody);
            setNote(note);


          } catch (e) {
            alert(e);
          }

          setIsLoading(false)
        }

        onLoad();
    }, [id]);

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
            <Input
                value={noteTitle}
                disabled={false}
                onChange={e => setNoteTitle(e.target.value)}
                onFocus={() => setButtonDisplay(true)}
                onBlur={ () => setButtonDisplay(false)}
            />
            <Textarea
                value={noteBody}
                disabled={false}
                onChange={e => setNoteBody(e.target.value)}
                onFocus={() => setButtonDisplay(true)}
                onBlur={ () => setButtonDisplay(false)}
            />
            {
                buttonDisplay && <SendButton isDisabled={!validateNote()} isLoading={isSending} onClick={handleUpdateNote}/>
            }


        </Box>
        </>
    )
}

export default Note;