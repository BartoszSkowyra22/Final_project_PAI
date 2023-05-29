fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Lublin?unitGroup=metric&key=E3QC7X8E5L3PVYLVPLV5UPATU&contentType=json", {
    method: 'GET',
    headers: {

    },

}).then(response => {
    if (!response.ok) {
        throw response; //check the http response code and if isn't ok then throw the response as an error
    }

    return response.json(); //parse the result as JSON

}).then(response => {
    //response now contains parsed JSON ready for use
    processWeatherData(response);

}).catch((errorResponse) => {
    if (errorResponse.text) { //additional error information
        errorResponse.text().then( errorMessage => {
            //errorMessage now returns the response body which includes the full error message
        })
    } else {
        //no additional error information
    }
});