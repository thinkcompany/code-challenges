import './App.scss';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import Total from './total';
import FareCalc from './FareCalc';
import zoneData from './zones';

function App() {
const { zones } = zoneData;
const [fareInfo, setFareInfo] = useState([]);

const onAdd = ( fare )  => {
  const exist = fareInfo.find(x => x.type === fare.type && x.purchase === fare.purchase)
  if (exist) {
    setFareInfo(fareInfo.map(x => x.type === fare.type && x.purchase === fare.purchase ? {...exist, qty: exist.qty +1} : x))
  }else {
    setFareInfo([...fareInfo, {...fare, qty: 1}]);
  }
}


  return (
    <div className="App">
      <Container className="m-auto">
        <Card>
          <Card.Header>Regional Rail Fares</Card.Header>
          <Card.Body>

            {/* Fare calculator container */}
            <FareCalc onAdd={onAdd} fareInfo={fareInfo} zones={zones} />

            <Card.Title>
              How many rides will you need?
          </Card.Title>
            <Form.Control type="password" placeholder="Password" />
          </Card.Body>
          <Card.Footer>

          {/* Total fare cost */}
            <Total fareInfo={fareInfo} zones={zones}></Total>

          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default App;