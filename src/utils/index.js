import moment from 'moment';
import GLOBAL from '../constants';

/**
 * Fetch Airport service and transfor data to ViewModel
 * @returns AirportArray contains Airport code and name
 */
export async function getAirports() {
    let response = await fetch(GLOBAL.API_AIRPORT_LIST);
    let data = await response.json();
    let obj = data.results;
    let airportArray = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            let val = obj[key];
            airportArray.push({id: val.iataCode, label: val.shortName+` (${val.iataCode})`})
        }
    }
    return airportArray;
}

/**
 * Flight status service calling
 * @param {object} params contains origin/destination/date
 * @returns Formated flight details for view binding
 */
export async function getFlights(params) {
    let query = `departureDate=${params.date}&origin=${params.origin.id}&destination=${params.destination.id}`;
    let response = await fetch(`${GLOBAL.API_FLIGHT_STATUS}?${query}`);
    let data = await response.json();
    // await sleep(1e3);
    // let data = {"results":[{"airlineDesignator":"EK","flightNumber":"0007","flightId":"2022031600007DXB","flightDate":"2022-03-16","flightRoute":[{"legNumber":"1","originActualAirportCode":"DXB","destinationActualAirportCode":"LHR","originPlannedAirportCode":"DXB","destinationPlannedAirportCode":"LHR","statusCode":"ARVD","flightPosition":100,"totalTravelDuration":"08:00","isIrregular":"false","departureTime":{"schedule":"2022-03-17T03:10:00Z","estimated":"2022-03-17T03:10:00Z","actual":"2022-03-17T03:15:00Z"},"arrivalTime":{"schedule":"2022-03-17T07:10:00Z","estimated":"2022-03-17T06:53:00Z","actual":"2022-03-17T07:08:00Z"},"operationalUpdate":{"lastUpdated":"2022-01-20T04:00:55Z"},"departureTerminal":"Terminal 3","arrivalTerminal":"Terminal 3","flightOutageType":0}]},{"airlineDesignator":"EK","flightNumber":"0001","flightId":"2022031700001DXB","flightDate":"2022-03-17","flightRoute":[{"legNumber":"1","originActualAirportCode":"DXB","destinationActualAirportCode":"LHR","originPlannedAirportCode":"DXB","destinationPlannedAirportCode":"LHR","statusCode":"ARVD","flightPosition":100,"totalTravelDuration":"07:55","isIrregular":"false","departureTime":{"schedule":"2022-03-17T07:45:00Z","estimated":"2022-03-17T07:45:00Z","actual":"2022-03-17T08:02:00Z"},"arrivalTime":{"schedule":"2022-03-17T11:40:00Z","estimated":"2022-03-17T11:37:00Z","actual":"2022-03-17T12:14:00Z"},"operationalUpdate":{"lastUpdated":"2022-01-21T04:00:54Z"},"departureTerminal":"Terminal 3","arrivalTerminal":"Terminal 3","flightOutageType":0}]},{"airlineDesignator":"EK","flightNumber":"0029","flightId":"2022031700029DXB","flightDate":"2022-03-17","flightRoute":[{"legNumber":"1","originActualAirportCode":"DXB","destinationActualAirportCode":"LHR","originPlannedAirportCode":"DXB","destinationPlannedAirportCode":"LHR","statusCode":"ARVD","flightPosition":100,"totalTravelDuration":"08:10","isIrregular":"false","departureTime":{"schedule":"2022-03-17T09:40:00Z","estimated":"2022-03-17T09:40:00Z","actual":"2022-03-17T09:52:00Z"},"arrivalTime":{"schedule":"2022-03-17T13:50:00Z","estimated":"2022-03-17T13:27:00Z","actual":"2022-03-17T13:28:00Z"},"operationalUpdate":{"lastUpdated":"2022-01-21T04:00:54Z"},"departureTerminal":"Terminal 3","arrivalTerminal":"Terminal 3","flightOutageType":0}]},{"airlineDesignator":"EK","flightNumber":"0031","flightId":"2022031700031DXB","flightDate":"2022-03-17","flightRoute":[{"legNumber":"1","originActualAirportCode":"DXB","destinationActualAirportCode":"LHR","originPlannedAirportCode":"DXB","destinationPlannedAirportCode":"LHR","statusCode":"ARVD","flightPosition":100,"totalTravelDuration":"08:00","isIrregular":"false","departureTime":{"schedule":"2022-03-17T12:10:00Z","estimated":"2022-03-17T12:10:00Z","actual":"2022-03-17T12:10:00Z"},"arrivalTime":{"schedule":"2022-03-17T16:10:00Z","estimated":"2022-03-17T15:46:00Z","actual":"2022-03-17T15:46:00Z"},"operationalUpdate":{"lastUpdated":"2022-01-21T04:00:54Z"},"departureTerminal":"Terminal 3","arrivalTerminal":"Terminal 3","flightOutageType":0}]},{"airlineDesignator":"EK","flightNumber":"0003","flightId":"2022031700003DXB","flightDate":"2022-03-17","flightRoute":[{"legNumber":"1","originActualAirportCode":"DXB","destinationActualAirportCode":"LHR","originPlannedAirportCode":"DXB","destinationPlannedAirportCode":"LHR","statusCode":"ARVD","flightPosition":100,"totalTravelDuration":"07:50","isIrregular":"false","departureTime":{"schedule":"2022-03-17T14:30:00Z","estimated":"2022-03-17T15:10:00Z","actual":"2022-03-17T14:59:00Z"},"arrivalTime":{"schedule":"2022-03-17T18:20:00Z","estimated":"2022-03-17T18:45:00Z","actual":"2022-03-17T18:46:00Z"},"operationalUpdate":{"lastUpdated":"2022-01-21T04:00:54Z"},"departureTerminal":"Terminal 3","arrivalTerminal":"Terminal 3","flightOutageType":0}]},{"airlineDesignator":"EK","flightNumber":"0005","flightId":"2022031700005DXB","flightDate":"2022-03-17","flightRoute":[{"legNumber":"1","originActualAirportCode":"DXB","destinationActualAirportCode":"LHR","originPlannedAirportCode":"DXB","destinationPlannedAirportCode":"LHR","statusCode":"ARVD","flightPosition":100,"totalTravelDuration":"07:55","isIrregular":"false","departureTime":{"schedule":"2022-03-17T16:05:00Z","estimated":"2022-03-17T16:05:00Z","actual":"2022-03-17T16:23:00Z"},"arrivalTime":{"schedule":"2022-03-17T20:00:00Z","estimated":"2022-03-17T19:52:00Z","actual":"2022-03-17T19:51:00Z"},"operationalUpdate":{"lastUpdated":"2022-01-21T04:00:54Z"},"departureTerminal":"Terminal 3","arrivalTerminal":"Terminal 3","flightOutageType":0}]}],"metaLinks":[{"href":"https://business-services-sg-cache-eol-prod.global-sg.svc/api/v1.0/flight-status?departureDate=2022-03-17&origin=DXB&destination=LHR","rel":"self","method":"GET"}]}
    let flightArray = []
    if (data.results != null && data.results.length) {
        flightArray = data.results.map(record => {
            let obj = {};
            //Assign flight number and name
            obj.flight = record.airlineDesignator+' '+record.flightNumber

            //Assign flight status
            if (record.flightRoute[0].statusCode === 'ARVD') {
                obj.flightStatus = "Arrived";
            } else if (record.flightRoute[0].statusCode === 'PDEP') {
                obj.flightStatus = "Not yet arrived";
            } else {
                obj.flightStatus = record.flightRoute[0].statusCode;
            }

            //Assign origin airport and details
            obj.origin = {}
            obj.origin.airport = params.origin.label;
            let week = moment(record.flightRoute[0].departureTime.estimated).format('ddd');
            let day = moment(record.flightRoute[0].departureTime.estimated).format('D');
            let month = moment(record.flightRoute[0].departureTime.estimated).format('MMM');
            let departedTime = moment(record.flightRoute[0].departureTime.estimated).format('HH:mm');
            let scheduledTime = moment(record.flightRoute[0].departureTime.schedule).format('HH:mm');
            obj.origin.departedDate = week+' '+day+' '+month;
            obj.origin.departedTime = departedTime;
            obj.origin.scheduledDepartedTime = scheduledTime

            //Assign destination airport and details
            obj.destination = {}
            obj.destination.airport = params.destination.label;
            week = moment(record.flightRoute[0].arrivalTime.estimated).format('ddd');
            day = moment(record.flightRoute[0].arrivalTime.estimated).format('D');
            month = moment(record.flightRoute[0].arrivalTime.estimated).format('MMM');
            departedTime = moment(record.flightRoute[0].arrivalTime.estimated).format('HH:mm');
            scheduledTime = moment(record.flightRoute[0].arrivalTime.schedule).format('HH:mm');
            obj.destination.arrivedDate = week+' '+day+' '+month;
            obj.destination.arrivedTime = departedTime;
            obj.destination.scheduledArrivedTime = scheduledTime

            return obj;
        })
    }
    return flightArray;
}