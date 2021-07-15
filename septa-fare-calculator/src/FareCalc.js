import React from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


const rideSched = ['Anytime', 'Weekday', 'Evening Weekend'];
const farePurch = ['Station Kiosk', 'Onboard'];


export default function fareCalc(props) {
const {zones, onAdd, onAddSched} = props;

  return (
    <div className="fareCalc">
      <Card.Title>Where are you going?</Card.Title>

      {/* Destination filter */}
      <Row>
        {zones.map(zone => (
          <Col key={zone.zoneNum}>
            <Button onClick={() =>onAdd(zone)} variant="outline-info">{zone.name}</Button>
          </Col>
        ))}
      </Row>

      {/* Ride schedule filter */}
      <Card.Title>When are you riding?</Card.Title>
      <Row>
        {rideSched.map((sched, i) => {
          return (
            <Col key={i}>
              <Button variant="outline-info">{sched}</Button>
            </Col>
          )
        })}
      </Row>

      {/* Fare purchase filter */}
      <Card.Title>Where will you purchase the fare?</Card.Title>
      <Row>
        {farePurch.map((purchType, i) => {
          return (
            <Col key={i}>
              <Button variant="outline-info">{purchType}</Button>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
