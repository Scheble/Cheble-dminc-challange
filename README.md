# Santiago Cheble - Weather challenge

## Getting Started

### Dependencies

* Node.js v16.4.2^

### Installing

* Install all dependencies with ```npm install```

### Executing program

* Start the server with ```node server```
* Navigate to http://localhost:3000/weather?city=rio%20cuarto,ar&moreThan=15&lessThan=15

### API Documentation
* Url format: http://localhost:3000/weather?city={City name}&moreThan={Value to compare}&lessThan={Value to compare}
* Acepted Params: 
  * city: City name and country to look for, use ISO 3166 country codes.
  * moreThan: Value to compare if the city temperature is greather. 
  * lessThan: Value to compare if the city temperature is less. 
  * lat: latitude of the city to look for. If city name was provided this will be ignored
  * lon: longitude of the city to look for. If city name was provided this will be ignored

* Response:
  * Object: 
    * temp: number
    * moreThan: boolean
    * lessThan: boolean
