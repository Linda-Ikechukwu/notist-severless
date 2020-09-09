import * as React from 'react';
import { Box, Image } from "@chakra-ui/core";

import NoteForm from '../components/noteForm';

import heroImage from '../assets/images/hero-image.png';

const Home = () => {
   return (
      <Box>
         <Image
            src={heroImage}
            alt="Hero Image"
         />
         <NoteForm />
      </Box>
   )
}

export default Home;