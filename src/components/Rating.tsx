import { useState } from 'react';

type ReviewsType = {
  email: string;
  message?: string;
  rating: string;
};

function Rating() {
  const [email, setEmail] = useState('');
  const [rate, setRate] = useState('');
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState<ReviewsType>();

  const handleChangeEmail = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  };

  const handleClickRadio = ({ target }: React.MouseEvent<HTMLInputElement>) => {
    setRate((target as HTMLInputElement).value);
  };

  const handleChangeMessage = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const Newreview = {
      email,
      message,
      rating: rate,
    };

    localStorage.setItem('reviews', JSON.stringify(Newreview));
  };

  return (
    <div>
      <h3>Avaliações</h3>
      <form>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          value={ email }
          onChange={ handleChangeEmail }
        />
        <div className="rate">
          <input
            type="radio"
            id="star1"
            name="rate"
            value="1"
            required
            onClick={ handleClickRadio }
          />
          <label htmlFor="star1" title="text">1 ★</label>
          <input
            type="radio"
            id="star2"
            name="rate"
            value="2"
            onClick={ handleClickRadio }
          />
          <label htmlFor="star2" title="text">2 ★</label>
          <input
            type="radio"
            id="star3"
            name="rate"
            value="3"
            onClick={ handleClickRadio }
          />
          <label htmlFor="star3" title="text">3 ★</label>
          <input
            type="radio"
            id="star4"
            name="rate"
            value="4"
            onClick={ handleClickRadio }
          />
          <label htmlFor="star4" title="text">4 ★</label>
          <input
            type="radio"
            id="star5"
            name="rate"
            value="5"
            onClick={ handleClickRadio }
          />
          <label htmlFor="star5" title="text">5 ★</label>
        </div>
        <textarea
          name="message"
          cols={ 30 }
          rows={ 5 }
          placeholder="Mensagem (Opcional)"
          onChange={ handleChangeMessage }
        />
        <button onClick={ handleSubmit }>Avaliar</button>
      </form>
    </div>
  );
}

export default Rating;
