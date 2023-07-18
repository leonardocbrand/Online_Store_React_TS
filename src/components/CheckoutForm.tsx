import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, FormControl, FormControlLabel,
  FormLabel, Paper, Radio, RadioGroup, Stack,
  TextField, Typography } from '@mui/material';
import { FormData, ProductsData } from '../types';
import barcodeImg from '../images/barcode.svg';
import visaImg from '../images/visa.svg';
import eloImg from '../images/elo.svg';
import mastercardImg from '../images/mastercard.svg';

type CheckoutFormProps = {
  setItensCar: React.Dispatch<React.SetStateAction<ProductsData[]>>
};

function CheckoutForm({ setItensCar }: CheckoutFormProps) {
  const [userData, setUserData] = useState<FormData>(
    {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      zipcode: '',
      address: '',
      payment: '',
    },
  );
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => (
      {
        ...prevData,
        [name]: value,
      }
    ));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.values(userData);
    const hasEmptyValues = values.some((value) => value.length === 0);

    if (values.length === 7 && !hasEmptyValues) {
      setItensCar([]);
      navigate('/');
    } else {
      setErrorMsg(true);
    }
  };

  return (
    <Paper
      sx={ {
        backgroundColor: '#FFF',
        ml: { xs: 0, md: 5 },
        height: { xs: '80h', lg: '60vh' },
        width: { xs: 370, md: 700 },
        p: 5,
        mt: { xs: 2, md: 17 } } }
    >
      <Typography
        variant="h1"
        fontSize={ 20 }
        fontWeight={ 700 }
        textAlign="center"
        p={ 1 }
      >
        Informações do comprador
      </Typography>
      <Stack
        component="form"
        onSubmit={ handleSubmit }
      >
        <Box p={ 1 }>
          <TextField
            variant="outlined"
            type="text"
            name="name"
            label="Nome Completo"
            value={ userData.name }
            onChange={ handleChange }
            data-testid="checkout-fullname"
            fullWidth
          />
          <TextField
            variant="outlined"
            type="text"
            name="email"
            label="Email"
            value={ userData.email }
            onChange={ handleChange }
            data-testid="checkout-email"
            fullWidth
            sx={ { mt: 1 } }
          />
        </Box>
        <Box p={ 1 }>
          <TextField
            variant="outlined"
            type="text"
            name="cpf"
            label="CPF"
            value={ userData.cpf }
            onChange={ handleChange }
            data-testid="checkout-cpf"
            sx={ { width: { xs: '100%', lg: '49%' } } }
          />
          <TextField
            variant="outlined"
            type="text"
            name="phone"
            label="Telefone"
            value={ userData.phone }
            onChange={ handleChange }
            data-testid="checkout-phone"
            sx={ {
              ml: { lg: 1 },
              mt: { xs: 1, lg: 0 },
              width: { xs: '100%', lg: '49%' } } }
          />
        </Box>
        <Box p={ 1 }>
          <TextField
            variant="outlined"
            type="text"
            name="zipcode"
            label="CEP"
            value={ userData.zipcode }
            onChange={ handleChange }
            data-testid="checkout-cep"
            sx={ { width: { xs: '100%', lg: '30%' } } }
          />
          <TextField
            variant="outlined"
            type="text"
            name="address"
            label="Endereço"
            value={ userData.address }
            onChange={ handleChange }
            data-testid="checkout-address"
            sx={ { ml: { xs: 0, lg: 1 },
              width: { xs: '100%', lg: '68%' },
              mt: { xs: 1, lg: 0 } } }
          />
        </Box>
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={ { p: 1, fontWeight: 600 } }
          >
            Método de pagamento

          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="boleto"
            value={ userData.payment }
            onChange={ handleChange }
            name="radio-buttons-group"
            sx={ {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center' } }
          >
            <FormControlLabel
              control={ <Radio /> }
              name="payment"
              value="boleto"
              data-testid="ticket-payment"
              label={ <img src={ barcodeImg } alt="Barcode" /> }
            />
            <FormControlLabel
              control={ <Radio /> }
              name="payment"
              value="visa"
              data-testid="visa-payment"
              label={ <img src={ visaImg } alt="Visa Card" /> }
            />
            <FormControlLabel
              control={ <Radio /> }
              name="payment"
              value="mastercard"
              data-testid="master-payment"
              label={ <img src={ mastercardImg } alt="Mastercard" /> }
            />
            <FormControlLabel
              control={ <Radio /> }
              name="payment"
              value="elo"
              data-testid="elo-payment"
              label={ <img src={ eloImg } alt="Elo Card" /> }
            />
          </RadioGroup>
        </FormControl>
        <Divider />
        <Button
          color="success"
          variant="contained"
          type="submit"
          data-testid="checkout-btn"
          sx={ { mt: 4 } }
        >
          Comprar
        </Button>
        {errorMsg ? (
          <Typography
            color="error"
            data-testid="error-msg"
            textAlign="center"
            p={ 1 }
          >
            Campos inválidos
          </Typography>) : null}
      </Stack>
    </Paper>
  );
}

export default CheckoutForm;
