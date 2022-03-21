import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import FlightInfo from "./flightInfo";
import {getAirports, getFlights} from "../utils/index"

/**
 * Footer Component
 */
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'© '}
      {new Date().getFullYear()+' '}
      The Emirates Group. All rights reserved.
    </Typography>
  );
}

/**
 * Base site theme defining
 * TODO: advanced theme, typography definintions
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#c62828',
    },
    secondary: {
      main: '#c62828',
    },
  },
});

/**
 * Styled MUI Item component
 */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/**
 * Styled MUI Button component
 */
const ViewDetailsButton = styled(Button)(({ theme }) => ({
  background: '#C60C30',
  textTransform: 'none',
  height: '53px',
  '&:hover': {
    backgroundColor: '#C60C30',
  }
}));

/**
 * Defines the main search component
 * @returns Search component
 */
export default function Search() {

  /**
   * Returns date format as YYYY-MM-DD
   */
  const getFormatedDate = (param) => {
    let input = new Date(param);
    let month = input.getMonth()+1;
    let date = input.getDate()
    if (month < 10) {
      month = "0"+month;
    }
    if (date < 10) {
      date = "0"+date;
    }
    return input.getFullYear()+'-'+month+'-'+date;
  }

  // Defines state variables and initializing.
  const [airports, setAirports] = React.useState([]);
  const [flights, setFlights] = React.useState([]);
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [departureDate, setDepartureDate] = React.useState(getFormatedDate(new Date()));
  const [isSearched, setIsSearched] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    getAirports()
      .then((data) => {setAirports(data)})
      .catch(error => error);
  }, [])

  /**
   * "View Details" button handler
   * Invoke the flight status API and 
   * assign the flight details response in state
   */
  const searchFlights = (event) => {
    event.preventDefault();
    setIsSearching(true);
    let params = {
      origin: origin,
      destination: destination,
      date: departureDate
    }
    getFlights(params)
      .then((data) => {setFlights(data); setIsSearched(true); setIsSearching(false);})
      .catch(error => {setIsSearched(true); setIsSearching(false);});
  };

  /**
   * Function used to format the date from picker.
   * Invoked while selecting a date from picker.
   */
  const handleDateChange = (event) => {
    let formattedDate = getFormatedDate(event)
    setDepartureDate(formattedDate);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Box component="form" noValidate onSubmit={searchFlights} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                  variant="filled"
                  value={origin}
                  onChange={(event, newValue) => {
                    setOrigin(newValue);
                  }}
                  id="filled-demo"
                  options={airports}
                  renderInput={(params) => 
                  <TextField 
                    {...params}
                    variant="filled"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                          <LocationOnIcon sx={{ color: "#b34d4d" }} ></LocationOnIcon>
                      ),
                    }} 
                    label="Leaving from" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                  value={destination}
                  onChange={(event, newValue) => {
                    setDestination(newValue);
                  }}
                  id="controllable-states-demo"
                  options={airports}
                  renderInput={(params) => 
                  <TextField 
                  {...params} 
                  variant="filled"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                        <LocationOnIcon sx={{ color: "#b34d4d" }} ></LocationOnIcon>
                    ),
                  }} 
                  label="Going to" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DesktopDatePicker
                    label="Departing"
                    inputFormat="dd MMM yyyy"
                    value={departureDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField variant="filled" style={{width: "100%"}} {...params} />}
                  />
                </LocalizationProvider>
                </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <ViewDetailsButton
                    disabled={(origin === "" || destination === "")}
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained">
                View Details
                </ViewDetailsButton>
              </Grid>
            </Grid>
        </Box>
        <div class="flight_details">
          <Stack spacing={1}>
            {isSearching === true && <LinearProgress color="inherit" />}
            { flights.length > 0 && flights.map((flight) => 
                <Item style={{"margin": "9px 3px"}}>
                  <FlightInfo flight={flight}></FlightInfo>
                </Item>
              )
            }
            {(isSearched === true && flights.length === 0) && <Alert severity="warning">No flights on the selected route!</Alert>}
            {isSearched === false && <Alert severity="info">Please try a new search.</Alert>}
          </Stack>
        </div>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}