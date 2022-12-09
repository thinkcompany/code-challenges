import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid4 from 'uuid4';
import {sections} from '../sections.js';
import {calculateFare} from '../utilities.js';
import Section from './Section.js';
import Header from './Header.js';

const StyledContainer = styled.div`
	border: 3px solid #d3d3d3;
	width: 25%;
	margin: 0 auto;
`;

const AppContainer = props => {
	// State management for the ajax call
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [fares, setFares] = useState({
		info: {},
		zones: [],
	});

	// State management for the user inputed data
	const [data, setData] = useState({
		zone: '1',
		travelTime: 'weekday',
		purchaseLocation: 'onboard_purchase',
		ticketQuantity: 1,
	});
	const [total, setTotal] = useState(null);

	/*  Since we're using a functional component here, we must use a useEffect hook that runs once to mimic the
  componentDidMount method to make the AJAX request */
	useEffect(() => {
		const url
			= 'https://raw.githubusercontent.com/emcgilldev/code-challenges/3360706bc9ebd7715aecc7f2c3ebb5df1d09cae8/septa-fare-calculator/fares.json';

		fetch(url)
			.then(res => res.json())
			.then(
				result => {
					setIsLoaded(true);
					setFares({
						info: result.info,
						zones: result.zones,
					});
				},
				error => {
					setIsLoaded(true);
					setError(error);
				},
			);
	}, []);

  useEffect(() => {
    if (data.travelTime === "anytime"){
      setData(prevState => ({ ...prevState, purchaseLocation: "advance_purchase"}));
    }
  }, [data.travelTime])

	const SectionList = () => {
		const zones = Array.from(fares.zones, element => element.zone);
		const times = ['Weekday', 'Evening Weekend', 'Anytime'];
		const locations = [
			{
				label: 'Onboard',
				value: 'onboard_purchase',
			},
			{
				label: 'Station Kiosk',
				value: 'advance_purchase',
			},
		];

		return sections.map(
			({subheading, inputType, dark, subtext}, i, sections) => {
				// If the last section in the list
				if (i + 1 === sections.length) {
					return (
						<Section
							key={uuid4()}
							subheading={subheading}
							inputType={inputType}
							dark={dark}
							subtext={subtext}
							text={calculateFare(fares.zones, data.zone, data.travelTime, data.purchaseLocation, data.ticketQuantity).toString()}
						/>
					);
				}

				// If the first section in teh list
				if (i === 0) {
					return (
						<Section
							setData={setData}
							data={data}
							key={uuid4()}
							type='zones'
							options={zones}
							subheading={subheading}
							inputType={inputType}
							dark={dark}
							subtext={subtext}
						/>
					);
				}

				if (i === 2) {
					return (
						<Section
							setData={setData}
							data={data}
							key={uuid4()}
							options={locations}
							time={data.travelTime}
							subheading={subheading}
							inputType={inputType}
							dark={dark}
							subtext={subtext}
						/>
					);
				}

				return (
					<Section
						setData={setData}
						data={data}
						key={uuid4()}
						options={times}
						subheading={subheading}
						inputType={inputType}
						dark={dark}
						subtext={subtext}
					/>
				);
			},
		);
	};

	return error ? (
		<div>{error}</div>
	) : (!isLoaded ? (
		<div>Loading...</div>
	) : (
		<StyledContainer>
			<Header />
			<SectionList />
		</StyledContainer>
	));
};

AppContainer.propTypes = {};

export default AppContainer;
