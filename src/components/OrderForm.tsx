import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  List,
  ListItem,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import septa_icon from 'img/septa-logo.png'
import { FarePurchaseOptions } from './FarePurchaseOptions';
import FareTypeSelect from './FareTypeSelect';
import RegionSelect from './RegionSelector';

const calcPrice = (_fares: any, _zone: string, _fareType: string, _farePurchase: string, _rides: number) => {
  if (!_fares || !_zone || !_fareType || !_farePurchase) return 0
  const price = _fares.zones
    .find((zone: any) => zone.zone === _zone)?.fares
    .find((fare: any) => fare.type === _fareType && fare.purchase === _farePurchase)?.price
  return (price || 0) * _rides
}

function OrderForm() {

  const [zone, setZone] = useState('')
  const [fareType, setFareType] = useState('')
  const [farePurchase, setFarePurchase] = useState('')
  const [rides, setRides] = useState(0)
  const [fares, setfares] = useState<any | null>(null)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setPrice(calcPrice(fares, zone, fareType, farePurchase, rides))
  }, [zone, fareType, farePurchase, rides, fares])

  useEffect(() => { // Ajax request for fares.json
    fetch('./fares.json')
      .then(res => res.json())
      .then((result) => {
        setfares(result)
      },
        (error) => {
          console.log({ error })
        }
      )
  }, [])
  return (
    <Container maxWidth={'sm'}>
      <Box padding={2}>
        {fares && (
          < Paper elevation={5}>
            <List
              sx={{ pb: 0 }}
              subheader={
                <Box
                  padding={2}
                  sx={{ background: 'gray' }}
                  display='flex' justifyContent='center' alignItems={'center'}
                  gap={2}
                >
                  <img src={septa_icon} style={{ height: 60 }} alt='septa-logo' />
                  <Typography variant='h4' fontWeight={'bold'} color='white'>Regional Rail Fares</Typography>
                </Box>
              }
            >
              <ListItem divider
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  padding: 3
                }}
              >
                <Typography fontWeight={'bold'} variant='h5'>Where are you going?</Typography>
                <RegionSelect _zones={fares.zones} _setZone={setZone} _currentZone={zone} />
              </ListItem>
              <ListItem divider
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  padding: 3
                }}
              >
                <Typography fontWeight={'bold'} variant='h5'>When are you riding?</Typography>
                <FareTypeSelect
                  _setFareType={(fareType) => {
                    // if fare type is "anytime", then this should always be "advanced_purchase"
                    if (fareType === 'anytime')
                      setFarePurchase('advance_purchase')
                    setFareType(fareType)
                  }}
                  _currentFareType={fareType}
                />
                <Typography textAlign='center'>{fares.info[fareType as keyof Object]}{fareType === 'anytime' && ', you can use the ticket for 10 trips'}</Typography>
              </ListItem>
              <ListItem divider
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  padding: 3
                }}
              >
                <Typography fontWeight={'bold'} variant='h5'>Where will you purchase the fare?</Typography>
                <FarePurchaseOptions
                  _setOption={(purchaseType) => {
                    if (fareType === 'anytime') // if fare type is 'anytime', then this should always be 'advanced_purchase'
                      setFarePurchase('advance_purchase')
                    else setFarePurchase(purchaseType)
                  }}
                  _currentFare={farePurchase}
                />
                <Typography textAlign='center'>{fares.info[farePurchase as keyof Object]}</Typography>
              </ListItem>
              <ListItem divider
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  padding: 3
                }}
              >
                <Typography fontWeight={'bold'} variant='h5'>How many rides will you need?</Typography>
                <TextField
                  value={rides}
                  onChange={(e) => {
                    if (isNaN(+e.target.value)) return
                    setRides(+e.target.value)
                  }}
                  inputProps={{
                    style: {
                      textAlign: 'end'
                    }
                  }}
                />
              </ListItem>
              <Box
                padding={2}
                sx={{ background: 'gray' }}
                display='flex'
                flexDirection={'column'}
                justifyContent='center' alignItems={'center'}
                gap={2}
              >
                <Typography variant='h4' fontWeight={'bold'} color='white'>Your fare will cost</Typography>
                <Typography variant='h1' fontWeight={'bold'} color='white'>${price ? price.toFixed(2) : ''}</Typography>
              </Box>
            </List>
          </Paper>
        )}
      </Box>
    </Container >
  );
}

export default OrderForm;
