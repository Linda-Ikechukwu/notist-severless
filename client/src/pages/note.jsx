import * as React from 'react';
import { useHistory } from "react-router-dom";
import {Box, Heading} from "@chakra-ui/core";

import NoteBox from '../components/noteBox';
import BackButton from '../components/backButton';

const Note = () => {

    const history = useHistory();
    const handleBackButtonClick = () => {
        history.push(`/notes/`);
    }

    return(
       <>   <BackButton handleBackButtonClick={handleBackButtonClick} />
            <NoteBox/> 
       </>
    )
}

export default Note;