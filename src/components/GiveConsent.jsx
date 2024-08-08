import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function GiveConsent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState({'news':false, 'ads':false, 'stats': false});
  let navigate = useNavigate();
  const saveData = () => {
    console.log('saving data !')
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, ...consent })
    };
    fetch('http://localhost:8080/consents', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('response : ', data);
          if (data.success === true) navigate('/consents')
        })
        .catch(error => console.error('Error:', error));
  }
  const handleCheck = (e, id) => {
    setConsent(prev => ({...prev, [id] : e.target.checked}));
  }

  return (
    <div className="give">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        className="userInfo"
      >
        <TextField 
          onChange={(e)=>{setName(e.target.value)}}
          id="user-name" label="Name" variant="outlined" />
        <TextField 
          onChange={(e)=>{setEmail(e.target.value)}}
          id="user-email" label="Email" variant="outlined" />
      </Box>
      <div><span>I agree to:</span></div>
      <div className="checkList">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Recieve newsletter" id="news" onChange={(e) => {handleCheck(e, 'news')}}/>
          <FormControlLabel control={<Checkbox />} label="Be shown targeted ads" id="ads" onChange={(e) => {handleCheck(e, 'ads')}}/>
          <FormControlLabel control={<Checkbox />} label="Contribute to anonymous visit statistics" id="stats" onChange={(e) => {handleCheck(e, 'stats')}}/>
        </FormGroup>
      </div>
      <Button 
        variant="contained"
        disabled={!Object.values(consent).includes(true)}
        onClick={()=>{saveData()}}
        aria-label="Set your consent">
          Give Consent
      </Button>
    </div>
  )
}

