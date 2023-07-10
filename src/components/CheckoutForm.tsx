import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormData, ProductsData } from '../types';

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
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        name="name"
        placeholder="Nome Completo"
        value={ userData.name }
        onChange={ handleChange }
        data-testid="checkout-fullname"
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={ userData.email }
        onChange={ handleChange }
        data-testid="checkout-email"
      />
      <input
        type="text"
        name="cpf"
        placeholder="CPF"
        value={ userData.cpf }
        onChange={ handleChange }
        data-testid="checkout-cpf"
      />
      <input
        type="text"
        name="phone"
        placeholder="Telefone"
        value={ userData.phone }
        onChange={ handleChange }
        data-testid="checkout-phone"
      />
      <input
        type="text"
        name="zipcode"
        placeholder="CEP"
        value={ userData.zipcode }
        onChange={ handleChange }
        data-testid="checkout-cep"
      />
      <input
        type="text"
        name="address"
        placeholder="Endereço"
        value={ userData.address }
        onChange={ handleChange }
        data-testid="checkout-address"
      />
      <section>
        <label htmlFor="ticket">
          <input
            type="radio"
            name="payment"
            value="boleto"
            data-testid="ticket-payment"
            onChange={ handleChange }
          />
          Boleto
        </label>
        <label htmlFor="card">
          <input
            type="radio"
            id="card"
            name="payment"
            value="visa"
            data-testid="visa-payment"
            onChange={ handleChange }
          />
          Visa
        </label>
        <label htmlFor="card">
          <input
            type="radio"
            id="card"
            name="payment"
            value="mastercard"
            data-testid="master-payment"
            onChange={ handleChange }
          />
          MasterCard
        </label>
        <label htmlFor="card">
          <input
            type="radio"
            id="card"
            name="payment"
            value="elo"
            data-testid="elo-payment"
            onChange={ handleChange }

          />
          Elo
        </label>
      </section>
      <button
        type="submit"
        data-testid="checkout-btn"
      >
        Comprar
      </button>
      {errorMsg ? <p data-testid="error-msg">Campos inválidos</p> : null}
    </form>
  );
}

export default CheckoutForm;
