

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import useFetch from '../api/useFetch';
import CanvasJSReact from '../canvasjsreact/canvasjs.react';




// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function DashboardAppPage() {
  const theme = useTheme();
  const {data, loading, error} = useFetch('/Dashboard-data')
  const d = useFetch('/GetReservationsNumberForEachClinic')
    
  const [Back, setBack] = useState(10)
  const [Internal, setInternal] = useState(10)
  const [Chest, setChest] = useState(10)
  const [Eye, setEye] = useState(10)

  
  const a = []
  Object.entries(d.data).forEach(([key, value]) => {
    a.push({label: key, value})
  })


  const [year, setYear] = useState(new Date().getFullYear().toString())

  const NoOfReservationsPerYear = useFetch(`/NumberOfReservationsPerMonthAndYear/${year}`)
  

  const options = {
    animationEnabled: true,	
    title:{
      text: "Number of New Reservations"
    },
    axisY : {
      title: "Number of Reservations"
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "spline",
      name: year,
      showInLegend: true,
      dataPoints: [
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Jan, label: "Jan" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Feb, label: "Feb" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Mar, label: "Mar" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Apr, label: "Apr" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.May, label: "May" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.JUN, label: "Jun" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Jul, label: "Jul" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Aug, label: "Aug" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Sept, label: "Sept" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Oct, label: "Oct" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Nov, label: "Nov" },
        { y: NoOfReservationsPerYear.data === undefined ? 0 : NoOfReservationsPerYear.data.Dec, label: "Dec" }
      ]
    },
    // {
    //   type: "spline",
    //   name: "2017",
    //   showInLegend: true,
    //   dataPoints: [
    //     { y: 172, label: "Jan" },
    //     { y: 173, label: "Feb" },
    //     { y: 175, label: "Mar" },
    //     { y: 172, label: "Apr" },
    //     { y: 162, label: "May" },
    //     { y: 165, label: "Jun" },
    //     { y: 172, label: "Jul" },
    //     { y: 168, label: "Aug" },
    //     { y: 175, label: "Sept" },
    //     { y: 170, label: "Oct" },
    //     { y: 165, label: "Nov" },
    //     { y: 169, label: "Dec" }
    //   ]
    // }
  ]
}



  useEffect(() => {
    
    setBack(d.data.Back === undefined ? 0 : d.data.Back)
    setInternal(d.data.Internal === undefined ? 0 : d.data.Internal)
    setChest(d.data.Chest === undefined ? 0 : d.data.Chest)
    setEye(d.data.Eye === undefined ? 0 : d.data.Eye)
  })
  
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Patients" total={data.patients === undefined ? 0 : data.patients} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Clinics" total={data.clinics === undefined ? 0 : data.clinics} color="info" icon={'uil:clinic-medical'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Reservations" total={data.reservations === undefined ? 0 : data.reservations} color="warning" icon={'teenyicons:appointments-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Users" total={data.users === undefined ? 0 : data.users} color="error" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              
              <MenuItem value={"2023"}>2023</MenuItem>
              <MenuItem value={"2022"}>2022</MenuItem>
              <MenuItem value={"2021"}>2021</MenuItem>
              <MenuItem value={"2020"}>2020</MenuItem>
            </Select>
          <CanvasJSChart options = {options} 
				    /* onRef={ref => this.chart = ref} */
			    />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Reservations"
              chartData={a}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
