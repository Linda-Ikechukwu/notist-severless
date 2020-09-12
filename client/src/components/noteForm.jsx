import React,{useState, useRef} from 'react';
import { useHistory } from "react-router-dom";

import { Input } from "@chakra-ui/core";
import { Box, Textarea } from "@chakra-ui/core";

import SendButton from '../components/sendButton';

//requests to API are authorized by IAM. Amplify takes care of that using the current user session
import { API } from "aws-amplify";

const NoteForm = () => {

  const history = useHistory();
  const [noteTitle, setnoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [isSending, setIsSending] = useState(false);


  const validateNote =() =>{
    return noteTitle.length > 3 && noteBody.length > 5
  }

  /*To the amplify API.post method, pass in name of API configured in index.js,
  API path specificied in corrresponding function in severless.yml*/

  const createNote = (note) => {
    return API.post("notist", "/notes", {
      body: note
    });
  }

  const handleNoteSend = async(event) => {
    event.preventDefault();
    setIsSending(true);

    try {
      await createNote({noteTitle,noteBody });
      history.push("/");
    } catch (error) {
      alert(error);
      setIsSending(false);
    }
  }



    return(
      <Box pos="relative">
           <Input
              roundedBottom="0"
              borderBottomWidth="0"
              placeholder="Your Title"
              size="lg"
              value={noteTitle}
              mt="30px"
              onChange={e => setnoteTitle(e.target.value)}
            />
           <Textarea
              roundedTop="0"
              borderTopWidth="0"
              h="200px"
              placeholder="Your Note"
              value={noteBody}
              onChange={e => setNoteBody(e.target.value)}
            />
           <SendButton isDisabled={!validateNote()} isLoading={isSending} onClick={handleNoteSend}/>
      </Box>
    )
}

export default NoteForm;