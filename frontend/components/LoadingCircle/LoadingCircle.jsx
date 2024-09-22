import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingCircle() {
  return (
 
    <Box sx={{ display: 'flex', justifyContent:'center',alignSelf:'center',marginTop:"15rem"}}>
      <CircularProgress sx={{color:"#FA824C"}} />
    </Box>

  );
}