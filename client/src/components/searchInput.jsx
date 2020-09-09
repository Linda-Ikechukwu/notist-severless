import * as React from 'react';
import { Input,Flex } from "@chakra-ui/core";
import { IconButton } from "@chakra-ui/core";



const SearchInput = () => {
    return(
       <Flex mb="20px" >
           <Input borderRadius="0" placeholder="Enter Title" size="lg" />
           <IconButton borderRadius="0" h="3rem" aria-label="Search All Notes" icon="search" />
          
       </Flex>
    )
}

export default SearchInput;