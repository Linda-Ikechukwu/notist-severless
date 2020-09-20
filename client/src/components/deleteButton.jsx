import * as React from 'react';
import { IconButton } from "@chakra-ui/core";

const DeleteButton = (props) => {
    return (

        <IconButton
            pos="absolute"
            bottom="5" left="5"
            variantColor="yellow"
            aria-label="delete note"
            icon="delete"
            zIndex="1000"
            {...props}

        />
    )
}

export default DeleteButton;