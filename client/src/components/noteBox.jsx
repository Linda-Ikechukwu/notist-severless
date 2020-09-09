import React, {useRef, useState} from 'react';
import ContentEditable from "react-contenteditable";
import { Box, Heading, Text } from "@chakra-ui/core";

import SendButton from '../components/sendButton';

const NoteBox = () => {

    const heading = 'In love with React & Next';
    const text = `Lorem ipsum is placeholder text commonly used in the graphic, print, 
    and publishing industries for previewing layouts and visual mockups.
    Lorem ipsum is placeholder text commonly used in the graphic, print, and
    publishing industries for previewing layouts and visual mockups.
    Lorem ipsum is placeholder text commonly used in the graphic, print, and
    publishing industries for previewing layouts and visual mockups.`
    
    const [buttonDisplay, setButtonDisplay] = useState(false);
   
    const noteHeading = useRef(heading);
    const noteText = useRef(text);

    const handleHeadingChange = e => {
        noteHeading.current = e.target.value;
    };

    const handleTextChange = e => {
        noteText.current = e.target.value;
    };

    return (
        <Box pos="relative" h="450px" borderWidth="1px" rounded="lg" overflow="hidden" mt="20px" p="10px" overflowY="scroll">
            <ContentEditable
                className="noteHeading"
                html={noteHeading.current}
                disabled={false}
                onChange={handleHeadingChange}
                onFocus={() => setButtonDisplay(true)}
                onBlur={ () => setButtonDisplay(false)}
            />
            <ContentEditable
                html={noteText.current}
                disabled={false}
                onChange={handleTextChange}
                onFocus={() => setButtonDisplay(true)}
                onBlur={ () => setButtonDisplay(false)}
            />
            {
                buttonDisplay && <SendButton/>
            }
            
            
        </Box>
    )
}

export default NoteBox;