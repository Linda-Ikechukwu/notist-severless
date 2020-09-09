import * as React from 'react';
import { IconButton } from "@chakra-ui/core";

const sendButton = (props) => {
    const { handleButtonClick } = props;

    return (
        <IconButton pos="absolute" bottom="5" right="5"
            variantColor="yellow"
            aria-label="Send"
            size="lg"
            icon="check"
            isRound="true"
            zIndex="1000"
            onClick ={handleButtonClick}
        />
    )
}

export default sendButton;