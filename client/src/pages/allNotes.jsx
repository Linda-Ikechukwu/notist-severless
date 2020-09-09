import * as React from 'react';
import { useHistory } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/core";

import SearchInput from '../components/searchInput'
import BackButton from '../components/backButton';
import NoteCard from '../components/noteCard';

const AllNotes = () => {
    
    const history = useHistory();
    const handleBackButtonClick = () => {
        history.push(`/`);
    }

    return (
        <>
            <SearchInput />
            <Box>
                <BackButton handleBackButtonClick={handleBackButtonClick} />
                <Heading my="20px" as="h3">All Notes</Heading>
                <NoteCard />
                <NoteCard />
                <NoteCard />
            </Box>

        </>
    )
}

export default AllNotes;