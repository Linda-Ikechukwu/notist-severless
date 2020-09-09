import * as React from 'react';
import { Input } from "@chakra-ui/core";
import { Box, Textarea } from "@chakra-ui/core";

import SendButton from '../components/sendButton';

const NoteForm = () => {
    return(
      <Box pos="relative">
           <Input roundedBottom="0" borderBottomWidth="0" placeholder="Your Title" size="lg" mt="30px"/>
           <Textarea roundedTop="0" borderTopWidth="0" h="200px" placeholder="Your Note"/>
           <SendButton/>
      </Box>
    )
}

export default NoteForm;