import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Container,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import LogoIcon from 'img/septa-logo.png'
import PurchaseOptions from './PurchaseOptions';
import FareTypeOptions from './FareTypeOptions';
import RegionSelect from './RegionSelector';
import { calcPrice } from 'utils';


const OrderForm = () => {
  const [zone, setZone] = useState('')
  const [fareType, setFareType] = useState('')
  const [farePurchase, setFarePurchase] = useState('')
  const [rides, setRides] = useState(0)
  const [fares, setfares] = useState<any | null>(null)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setPrice(calcPrice(fares, zone, fareType, farePurchase, rides))
  }, [zone, fareType, farePurchase, rides, fares])

  useEffect(() => {
    fetch('./fares.json').then(res => res.json()).then((result) => {
      setfares(result)
    })
  }, [])

  const handleChangePurchase = useCallback((purchaseType: string) => {
    if (fareType === 'anytime') setFarePurchase('advance_purchase')
    else setFarePurchase(purchaseType)
  }, [fareType])

  const handleChangeFareType = (type: string) => {
    if (type === 'anytime') setFarePurchase('advance_purchase')
    setFareType(type)
  }

  if (!fares) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box padding={2}>
        <Paper elevation={5}>
          <List
            sx={{ pb: 0 }}
            subheader={
              <Box
                padding={2}
                bgcolor="gray"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                <img src={LogoIcon} style={{ height: 60 }} alt="Logo" />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                >
                  Regional Rail Fares
                </Typography>
              </Box>
            }
          >
            <ListItem
              divider
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                padding: 3
              }}
            >
              <Typography fontWeight="bold" variant="h5">
                Where are you going?
              </Typography>

              <RegionSelect
                options={fares.zones}
                onChange={(zone) => setZone(zone)}
                option={zone}
              />
            </ListItem>

            <ListItem
              divider
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                padding: 3
              }}
            >
              <Typography fontWeight="bold" variant="h5">
                When are you riding?
              </Typography>

              <FareTypeOptions onChange={handleChangeFareType} option={fareType}/>

              <Typography textAlign="center">
                {fares.info[fareType as keyof Object]}{fareType === 'anytime' && ', you can use the ticket for 10 trips'}
              </Typography>
            </ListItem>

            <ListItem
              divider
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                padding: 3
              }}
            >
              <Typography fontWeight="bold" variant="h5">
                Where will you purchase the fare?
              </Typography>

              <PurchaseOptions onChange={handleChangePurchase} option={farePurchase} />

              <Typography textAlign='center'>
                {fares.info[farePurchase as keyof Object]}
              </Typography>
            </ListItem>

            <ListItem
              divider
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                padding: 3
              }}
            >
              <Typography fontWeight="bold" variant="h5">
                How many rides will you need?
              </Typography>

              <TextField
                value={rides}
                inputProps={{ sx: { textAlign: 'center' } }}
                onChange={(e) => {
                  if (isNaN(+e.target.value)) return
                  setRides(+e.target.value)
                }}
              />
            </ListItem>

            <Box
              p={2}
              bgcolor="gray"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Typography variant="h4" fontWeight="bold" color="white">
                Your fare will cost
              </Typography>

              <Typography variant="h1" fontWeight="bold" color="white">
                ${price.toFixed(2)}
              </Typography>
            </Box>
          </List>
        </Paper>
      </Box>
    </Container >
  );
}

export default OrderForm;
