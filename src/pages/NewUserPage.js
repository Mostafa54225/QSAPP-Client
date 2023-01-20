import { Helmet } from 'react-helmet-async';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/newuserpage.css'
// @mui
import { styled } from '@mui/material/styles';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Container } from '@mui/material';
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
const REGISTER_URL = '/users/register';

export default function NewUser() {

    const navigate = useNavigate();

    const errRef = useRef()


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [nationalId, setNationalId] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [errMsg, setErrMsg] = useState('');

  const mdUp = useResponsive('up', 'md');
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = async () => {
    try {
        console.log('hi')
        const response = await axios.post(REGISTER_URL, 
            JSON.stringify({
                UserName: username, 
                Password: password, 
                NationalId: nationalId, 
                PhoneNumber: phoneNumber,
                RoleId: 1
            }), {
                headers: { 'Content-Type': 'application/json' }
            })

        ShowNotification("Success", "User Created successfully!", "success")
        setUsername('')
        setPassword('')
        setPhoneNumber('')
        setNationalId('')
    } catch (error) {
        console.log(error)
        if (!error?.response) {
            setErrMsg('No Server Response');
        } else if (error.response?.status === 400) {
            setErrMsg(error.response.data);
        } else {
            setErrMsg('Registration Failed')
        }
    }
  };
  return (
    <>
      <Helmet>
        <title> New user </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              New user
            </Typography>
            <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
            {/* <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography> */}


<>
      <Stack spacing={3}>
        <TextField name="text" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password} onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField name="text" label="National Id" value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
        <TextField name="text" label="Phonenumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" style={{display: 'none'}} label="Remember me" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Create new user
      </LoadingButton>
    </>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
