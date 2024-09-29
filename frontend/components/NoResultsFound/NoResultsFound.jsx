import * as React from 'react';
import Box from '@mui/material/Box';

export default function NoResultsFound({message}) {
  return (
 
    <Box sx={{ display: 'flex', justifyContent:'center',alignSelf:'center',marginTop:"15rem"}}>
      <h1>{message}</h1>
    </Box>

  );
}