import * as React from 'react';
import { Link } from "@chakra-ui/core";

const BackButton = (props) => {
    const {handleBackButtonClick} = props;

    return(
        <Link fontSize="1.2rem" mt="20px" onClick={handleBackButtonClick}>← Back</Link>
    )
}

export default BackButton;