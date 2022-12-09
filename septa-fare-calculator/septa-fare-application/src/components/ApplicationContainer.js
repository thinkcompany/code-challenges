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

	// Automatically sets the purchaseLocation state based on whether "anytime" option is selected
	useEffect(() => {
		if (travelTime === Object.keys(info)[0]) {
			setData(previousState => ({...previousState, purchaseLocation: Object.keys(info)[3]}));
		}
	}, [travelTime]);

	const SectionList = () => {
		const zoneArray = Array.from(zones, element => element.zone);
		/* 	It creates an array of the first three keys in the info object, and then it maps over that array and 
		replaces the underscores with spaces, and then it maps over that array and capitalizes the first letter of 
		each word, and then it joins the words together. */
		const times = Object.keys(info).slice(0, 3).map(element => element.replace('_', ' ')).map(element => element.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' '));
		const locationAray = Object.keys(info).slice(3, 5);
		const locations = [
			{
				label: 'Onboard',
				value: locationAray[1],
			},
			{
				label: 'Station Kiosk',
				value: locationAray[0],
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
							text={`$${calculateFare(fares, zone, travelTime, purchaseLocation, ticketQuantity).toString()}`}
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
