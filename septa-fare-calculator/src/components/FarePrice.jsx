import React from "react";
import styled from "styled-components";

const PriceContaier = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 140px;
  padding: 30px;
  background-color: #595959;
`;

const PriceTitle = styled.p`
  font-size: 28px;
  color: #fff;
  margin-bottom: 10px;
`;

const PriceAmount = styled.p`
  text-align: center;
  font-size: 70px;
  font-weight: 600;
  color: #fff;
`;

const HelperMesage = styled.p`
  color: #fff;
  font-size: 18px;
  margin-top: 16px;
  text-align: center;
  padding: 0 10px;
`;

const FarePrice = ({ pricePerRide, totalRides, daytimeSelected }) => {
  return (
    <PriceContaier role="contentinfo">
      <PriceTitle>Your fare will cost</PriceTitle>

      {/* Handle Anytime Rides  */}
      {daytimeSelected === "Anytime" && totalRides % 10 !== 0 && (
        <PriceAmount>Error Found</PriceAmount>
      )}
      {daytimeSelected === "Anytime" && totalRides % 10 === 0 && (
        <>
          <PriceAmount>
            ${parseFloat(pricePerRide * totalRides).toFixed(2)}
          </PriceAmount>
          {totalRides && pricePerRide && (
            <HelperMesage>
              Price Per Ride: ${parseFloat(pricePerRide).toFixed(2)}
            </HelperMesage>
          )}
        </>
      )}

      {/* Handle Weekday & Evening_Weekend Rides  */}
      {daytimeSelected !== "Anytime" && (
        <>
          <PriceAmount>
            ${parseFloat(pricePerRide * totalRides).toFixed(2)}
          </PriceAmount>
          {totalRides && pricePerRide && (
            <HelperMesage>
              Price Per Ride: ${parseFloat(pricePerRide).toFixed(2)}
            </HelperMesage>
          )}
        </>
      )}
    </PriceContaier>
  );
};

export default FarePrice;
