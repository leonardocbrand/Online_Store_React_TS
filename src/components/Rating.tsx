import { Box, Button, Container,
  Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Star } from '@mui/icons-material';

const INITIAL_STATE = {
  email: '',
  message: '',
  rating: '',
};

type ReviewType = {
  email: string;
  message: string;
  rating: string;
};

type ParamsType = {
  idDetails: string;
};

function RatingForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isInvalid, setIsInvalid] = useState(false);
  const { idDetails } = useParams<keyof ParamsType>() as ParamsType;
  const [reviews, setReviews] = useState<ReviewType[]>(JSON
    .parse(localStorage.getItem(idDetails) ?? '[]'));

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.email.length === 0
      || !(formData.email.includes('@'))
      || formData.rating.length === 0) {
      setIsInvalid(true);
      return;
    }

    if (localStorage.getItem(idDetails)) {
      const arrayReviews = JSON.parse(localStorage.getItem(idDetails) ?? '[]');
      localStorage.setItem(idDetails, JSON.stringify([...arrayReviews, formData]));
    } else {
      localStorage.setItem(idDetails, JSON.stringify([formData]));
    }

    setIsInvalid(false);
    setFormData(INITIAL_STATE);
    setReviews(JSON.parse(localStorage.getItem(idDetails) ?? '[]'));
  };

  return (
    <Container
      sx={ {
        p: 4,
        mt: 10,
        mb: 5,
        backgroundColor: '#FFF',
        minWidth: '100%',
        minHeight: '100vh' } }
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={ { alignItems: { xs: 'flex-start', sm: 'center' } } }
      >
        <Typography
          variant="h2"
          fontSize={ 20 }
          fontWeight={ 700 }
          mb={ 2 }
        >
          Avaliações

        </Typography>
        <Stack component="form" onSubmit={ handleSubmit }>
          <TextField
            variant="outlined"
            data-testid="product-detail-email"
            type="email"
            name="email"
            id="email"
            label="Email"
            required
            value={ formData.email }
            onChange={ handleChange }
            sx={ { height: 35, mb: 4 } }
          />
          <Rating
            name="rating"
            value={ Number(formData.rating) }
            onChange={ (event, newValue) => {
              setFormData((prevData) => ({ ...prevData, rating: String(newValue) }));
            } }
          />
          <TextField
            multiline
            variant="outlined"
            data-testid="product-detail-evaluation"
            name="message"
            label="Mensagem (Opcional)"
            onChange={ handleChange }
            value={ formData.message }
            rows={ 5 }
            sx={ { width: { xs: 326.4, md: 482 }, mt: 1, mb: 2 } }
          />
          <Button
            variant="contained"
            color="success"
            data-testid="submit-review-btn"
            type="submit"

          >
            Avaliar

          </Button>
        </Stack>
        {(isInvalid)
      && (
        <Typography
          color="error"
          variant="subtitle2"
          mt={ 1 }
          data-testid="error-msg"
        >
          Campos inválidos

        </Typography>
      )}
      </Box>
      {(reviews.length > 0)
      && (
        <Stack component="section" mt={ 4 } spacing={ 3 }>
          <Divider />
          {reviews.map((item : { email:string; rating:string; message:string; }) => {
            return (
              <Box key={ item.email } component="section">
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    variant="h2"
                    fontWeight={ 700 }
                    data-testid="review-card-email"
                    sx={ { fontSize: { xs: 17, md: 20 } } }
                  >
                    {item.email}
                  </Typography>
                  {(item.rating === '1') && (<Star data-testid="review-card-rating" />)}
                  {(item.rating === '2') && (
                    <Box>
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                    </Box>
                  )}
                  {(item.rating === '3') && (
                    <Box>
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                    </Box>
                  )}
                  {(item.rating === '4') && (
                    <Box>
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                    </Box>
                  )}
                  {(item.rating === '5') && (
                    <Box>
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                      <Star data-testid="review-card-rating" />
                    </Box>
                  )}
                </Box>
                <Typography
                  fontSize={ 16 }
                  fontWeight={ 400 }
                  color="#94979D"
                  variant="body2"
                  data-testid="review-card-evaluation"
                >
                  {item.message}

                </Typography>
                <Divider />
              </Box>
            );
          })}
        </Stack>
      )}
    </Container>
  );
}

export default RatingForm;
