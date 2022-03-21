import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    boxShadow: 'none',
    padding: '0px',
}));

const AirportDetails = (props) => {
    console.log(">>>>>>"+JSON.stringify(props));
    const flight = props.flight;
    return (
        <Stack style={{"width": "90%"}}>
            <Item>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Item style={{ "width": "100%", "textAlign": "left", "paddingBottom": "10px" }}>{flight.origin.airport}</Item>
                    <Item style={{ "width": "100%", "textAlign": "right", "paddingBottom": "10px" }}>{flight.destination.airport}</Item>
                </Stack>
            </Item>
            <Item>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Item style={{ "width": "100%", "textAlign": "left", "font-size": "9px" }}>Departed:</Item>
                    <Item style={{ "width": "100%", "textAlign": "right", "font-size": "9px" }}>Arrived:</Item>
                </Stack>
            </Item>
            <Item>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Item style={{ "width": "25%", "textAlign": "left" }}>
                        <h1>{flight.origin.departedTime}</h1>
                    </Item>
                    <Item sx={{ display: { xs: 'none', sm: 'block', md: 'block', xl: 'block', lg: 'block' } }} style={{ "width": "75%", "textAlign": "center" }}>
                        <img style={{ "width": "100%"}} src="/images/flight-direction.png" alt=""/>
                    </Item>
                    <Item style={{ "width": "25%", "textAlign": "right" }}>
                        <h1>{flight.destination.arrivedTime}</h1>
                    </Item>
                </Stack>
            </Item>
            <Item>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Item style={{ "width": "100%", "textAlign": "left", "font-size": "9px" }}>{flight.origin.departedDate}</Item>
                    <Item style={{ "width": "100%", "textAlign": "right", "font-size": "9px" }}>{flight.destination.arrivedDate}</Item>
                </Stack>
            </Item>
            <Item>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Item style={{ "width": "100%", "textAlign": "left", "font-size": "9px" }}>Scheduled Departure: {flight.origin.scheduledDepartedTime}</Item>
                    <Item style={{ "width": "100%", "textAlign": "right", "font-size": "9px" }}>Scheduled Arrival: {flight.destination.scheduledArrivedTime}</Item>
                </Stack>
            </Item>
        </Stack>
    );
}

const FlightInfo = (props) => {
    const flight = props.flight;
    let ribbonClass = "amber_card";
    if (flight.flightStatus === 'Arrived') {
        ribbonClass = "green_card";
    } else if (flight.flightStatus === 'Not yet arrived') {
        ribbonClass = "blue_card";
    }
    return (
        <>
            <div class="container">
                <div class={ribbonClass} data-label={flight.flightStatus}>
                    <div class="card__container">
                    <Grid container>
                        <Grid item xs={8}>
                            <AirportDetails {...props}></AirportDetails>
                        </Grid>
                        <Divider orientation="vertical" flexItem></Divider>
                        <Grid item xs={3}>
                        <div style={{"transform": "translateY(-35%)", "position": "relative","top": "50%"}}>
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0} >
                                <Item><img class="flight-tail" src="images/flight-tail.svg" alt="img" /></Item>
                                <Item><h3>{flight.flight}</h3></Item>
                            </Stack>
                        </div>
                        </Grid>
                    </Grid>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FlightInfo;


