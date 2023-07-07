import { useState } from 'react';

const INITIAL_STATE = {
  email: '',
  message: '',
  rating: '',
};

const productId = 'reviews';

function Rating() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (formData.email.length === 0
      || !(formData.email.includes('@'))
      || formData.rating.length === 0) {
      setIsInvalid(true);
      return;
    }

    if (localStorage.getItem(productId)) {
      const arrayReviews = JSON.parse(localStorage.getItem(productId) as string);
      localStorage.setItem(productId, JSON.stringify([...arrayReviews, formData]));
    } else {
      localStorage.setItem(productId, JSON.stringify([formData]));
    }
    setIsInvalid(false);
    setFormData(INITIAL_STATE);
  };

  const reviews = JSON.parse(localStorage.getItem(productId) as string);

  return (
    <div>
      <h3>Avaliações</h3>
      {(isInvalid)
      && (
        <div>
          <p data-testid="error-msg">Campos inválidos</p>
        </div>
      )}
      <form>
        <input
          data-testid="product-detail-email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          value={ formData.email }
          onChange={ handleChange }
        />
        <div className="rating">
          <input
            data-testid="1-rating"
            type="radio"
            id="star1"
            name="rating"
            value="1"
            required
            onChange={ handleChange }
          />
          <label htmlFor="star1" title="text">1 ★</label>
          <input
            data-testid="2-rating"
            type="radio"
            id="star2"
            name="rating"
            value="2"
            onChange={ handleChange }
          />
          <label htmlFor="star2" title="text">2 ★</label>
          <input
            data-testid="3-rating"
            type="radio"
            id="star3"
            name="rating"
            value="3"
            onChange={ handleChange }
          />
          <label htmlFor="star3" title="text">3 ★</label>
          <input
            data-testid="4-rating"
            type="radio"
            id="star4"
            name="rating"
            value="4"
            onChange={ handleChange }
          />
          <label htmlFor="star4" title="text">4 ★</label>
          <input
            data-testid="5-rating"
            type="radio"
            id="star5"
            name="rating"
            value="5"
            onChange={ handleChange }
          />
          <label htmlFor="star5" title="text">5 ★</label>
        </div>
        <input
          data-testid="product-detail-evaluation"
          name="message"
          placeholder="Mensagem (Opcional)"
          onChange={ handleChange }
          value={ formData.message }
        />
        <button data-testid="submit-review-btn" onClick={ handleSubmit }>Avaliar</button>
      </form>
      {(reviews)
      && (
        <div>
          {reviews.map((item : { email:string; rating:string; message:string; }) => {
            return (
              <div key={ item.email }>
                <p data-testid="review-card-email">{item.email}</p>
                {(item.rating === '1') && (<p data-testid="review-card-rating">★</p>)}
                {(item.rating === '2') && (<p data-testid="review-card-rating">★★</p>)}
                {(item.rating === '3') && (<p data-testid="review-card-rating">★★★</p>)}
                {(item.rating === '4') && (<p data-testid="review-card-rating">★★★★</p>)}
                {(item.rating === '5') && (<p data-testid="review-card-rating">★★★★★</p>)}
                <p data-testid="review-card-evaluation">{item.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Rating;
