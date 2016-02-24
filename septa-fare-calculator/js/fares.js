/**
 * Created by Brendan on 2/23/2016.
 */
"use strict";
var fareCalculator = (function iife(){
    function getRideParameters() {
        return {
            zone: $("#zoneSelect").val(),
            type: $("#typeSelect").val(),
            purchase: $("input[name=purchase-radio]:checked").val(),
            trips: $("#rideQuantity").val()
        }
    }
    function updateFare(data,params){
        if(params.zone == null || params.purchase == null || params.type == null || params.trips === "") {
            return false;
        }
        var fare = queryFare(data,params);
        var totalCost;
        //If Bulk Purchasing is necessary use that price
        if(fare.trips >= params.trips)
            totalCost = fare.price;
        else
            totalCost = fare.price * Math.ceil(params.trips/fare.trips);
        $("#fareCalculation").text(utilJS.formatCurrency(totalCost));
    }

    function updateHelperText(data,params){
        $("#typeHelpText").text(data.info[params.type]);
        $("#purchaseHelpText").text(data.info[params.purchase]);
    }
    function queryFare(fareData,params){
        var zone = utilJS.getObjects(fareData,"zone",params.zone);
        if(zone.length >= 0){
            var fareArray = zone[0].fares;
            for(var i = 0; i <= fareArray.length-1;i++){
                var fare = fareArray[i];
                //No Logic needed for handling multiple matching records because the data currently contains none
                if(fare.type === params.type && fare.purchase === params.purchase){
                    return fare;
                }
            }
        }
    }
    function init(){
        //Bind Event Listener
        $("#main").on("change",".rate-filter",function(){
            var params = getRideParameters();
            $.getJSON("./content/fares.json").done(function(data){
                updateHelperText(data,params);
                updateFare(data,params);
            });
        });
    }
    return {
        init: init
    }
})();

$(document).ready(function(){
    fareCalculator.init();
});