import { Helmet } from 'react-helmet-async';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/newuserpage.css'
// @mui
import { styled } from '@mui/material/styles';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Container, RadioGroup, FormControlLabel, Radio, FormGroup, Input } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import axios from '../api/axios';
import ShowNotification from '../utils/ShowNotification';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));



// ----------------------------------------------------------------------
const CREATE_CLINIC_URL = '/clinics';

export default function NewClinic() {

    const navigate = useNavigate();

    const errRef = useRef()


    const [clinicName, setClinicName] = useState('')
    const [rangeFrom, setRangeFrom] = useState()
    const [rangeTo, setRangeTo] = useState()
    const [limit, setLimit] = useState()
    const [clinicType, setClinicType] = useState("advisor")
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [workDays, setWorkDays] = useState([])
    const [clinicImage, setClinicImage] = useState(null)
    const [imageName, setImageName] = useState(null)


    const WeekDays = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday", 
      "Wednesday", 
      "Thursday", 
      "Friday"
  ]

    const [errMsg, setErrMsg] = useState('');

    const handleCheckBox = (e) => {
      const checkedArr = []
      let value
      if (e.target.type !== 'checkbox') {
          value = e.target.value;
        } else {
          const checkeds = document.getElementsByTagName('input');
          for (let i = 8; i < checkeds.length; i+=1) {
            if (checkeds[i].checked) {
              checkedArr.push(JSON.parse(checkeds[i].value))
            }
          }
          value = checkedArr;
        }
      setWorkDays(value)
    }


  const uploadImage = (e) => {
    const file = e.target.files[0]
    setImageName(e.target.files[0].name)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setClinicImage(reader.result)
    };

  }


  const handleClick = async (e) => {
    e.preventDefault()
    const body = {
      Name: clinicName,
      RangeFrom: rangeFrom,
      RangeTo: rangeTo,
      LogoFile: clinicImage,
      Logo: imageName,
      Limit: limit,
      WorkDays: workDays,
      clinicType
    }
    try {
        const response = await axios.post(CREATE_CLINIC_URL, body, {
          headers: { 'Content-Type': 'application/json' }, responseType: 'text'
        })

        ShowNotification("Success", "User Created successfully!", "success")
        setClinicName('')
        setRangeFrom()
        setRangeTo()
        setLimit()
        setLatitude()
        setLongitude()
    } catch (error) {
        console.log(error)
        ShowNotification("Error", "There's somthing wrong", "danger")
    }
  };
  return (
    <>
      <Helmet>
        <title> Create Clinic </title>
      </Helmet>

      <StyledRoot>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              New Clinic
            </Typography>
            <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
            {/* <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography> */}


    <>
      <Stack spacing={3}>
        <TextField name="clinicName" label="Clinic Name" value={clinicName} onChange={(e) => setClinicName(e.target.value)} />

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <TextField name="rangeFrom" label="Range From" type="number" value={rangeFrom} onChange={(e) => setRangeFrom(e.target.value)} />
          <TextField name="rangeTo" label="Range To" type="number" value={rangeTo} onChange={(e) => setRangeTo(e.target.value)} />
        </Stack>
        <TextField name="limit" label="Limit" type="number" value={limit} onChange={(e) => setLimit(e.target.value)} />

        <RadioGroup row defaultValue="advisor" name="clinicType" onChange={(e) => setClinicType(e.target.value)}>
          <FormControlLabel value="advisor" control={<Radio />} label="advisor" />
          <FormControlLabel value="specialist" control={<Radio />} label="specialist" />
        </RadioGroup>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <TextField name="latitude" label="Latitude" type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          <TextField name="longitude" label="Longitude" type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </Stack>



          <FormGroup style={{display: 'inline-block'}}>
            <Typography>Work Days:</Typography>
            {WeekDays.map((day, idx) => (
                <div key={idx}>
                  <FormControlLabel control={<Checkbox color='primary' id="checkBox" onChange={handleCheckBox} value={JSON.stringify(day)} />} label={day} />
                </div>
            ))}

          </FormGroup> 


          <Typography>Clinic Image:</Typography>
          <Input type='file' onChange={uploadImage} />

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" style={{display: 'none'}} label="Remember me" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Create new clinic
      </LoadingButton>
    </>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
