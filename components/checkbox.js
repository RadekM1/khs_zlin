import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { orange } from '@mui/material/colors';

export default function CheckBox({ checked, label, id, handleChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => handleChange(e.target.checked, id)}
            sx={{
              color: orange[500],
              '&.Mui-checked': {
                color: orange[500],
              },
            }}
          />
        }
        label={label}
        sx={{
          '& .MuiFormControlLabel-label': {
            color: checked ? orange[500] : 'inherit',
          },
        }}
      />
    </FormGroup>
  );
}
