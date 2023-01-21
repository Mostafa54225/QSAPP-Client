import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import Clinic from './Clinic';

// ----------------------------------------------------------------------

ClinicList.propTypes = {
  clinics: PropTypes.array.isRequired,
};
 
export default function ClinicList({ clinics, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {clinics.map((clinic) => (
        <Grid key={clinic.id} item xs={12} sm={6} md={3}>
          <Clinic clinic={clinic} />
        </Grid>
      ))}
    </Grid>
  );
}
