import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function EditableTextField({ label,onChange,value }) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
      noValidate
      autoComplete="off"
    >
     
      <TextField 
      id="filled-basic" 
      label={label} 
      variant="filled" 
      value={value} 
      onChange={onChange}/>
     
    </Box>
  );
}