/* eslint-disable */


import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
import Iconify from '../components/iconify';

import { useNavigate } from 'react-router-dom';

import useFetch from '../api/useFetch';
// components
import { ProductSort, ClinicList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/clincs';

// ----------------------------------------------------------------------

export default function ClinicsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate()

  const { data } = useFetch('/clinics')

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const routeChange = (path) => {
    navigate(`/${path}`)
  }

  return (
    <>
      <Helmet>
        <title> Clinics </title>
      </Helmet>

      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Clinics
          </Typography>
          <Button variant="contained" onClick={() => routeChange('new-clinic')}   startIcon={<Iconify icon="uil:clinic-medical" />}>
            New Clinic
          </Button>
        </Stack>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        <ClinicList clinics={data} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
