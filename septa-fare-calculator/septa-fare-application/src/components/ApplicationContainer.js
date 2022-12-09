import React, {useState, useEffect} from 'react';
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
	// Destructure object for ease of reference
	const {info, zones} = fares;
	const {zone, travelTime, purchaseLocation, ticketQuantity} = data;

	/*  Since we're using a functional component here, we must use a useEffect hook that runs once to mimic the 
	componentDidMount method to make the AJAX request */
	useEffect(() => {
		// Shortened url that leads to the raw json on github
		const url = 'https://tinyurl.com/mryz6k2f';

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
		if (travelTime === 'anytime') {
			setData(previousState => ({...previousState, purchaseLocation: 'advance_purchase'}));
		}
	}, [travelTime]);

	const SectionList = () => {
		const zoneArray = Array.from(zones, element => element.zone);
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
							text={calculateFare(fares, zone, travelTime, purchaseLocation, ticketQuantity).toString()}
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
							options={zoneArray}
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
							time={travelTime}
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
