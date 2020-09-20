import * as React from 'react';
import { Box, Image, Text } from "@chakra-ui/core";

import NoteForm from '../components/noteForm';

import heroImage from '../assets/images/hero-image.png';

const Home = () => {
   return (
      <Box>
         <Text mb="20px">Hey, Whats on your mind today?</Text>
         <Image
            src={heroImage}
            alt="Hero Image"
         />
         <NoteForm />
      </Box>
   )
}

export default Home;