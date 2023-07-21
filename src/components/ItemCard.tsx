import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductsData } from '../types';

type ItemCardProps = {
  product: ProductsData;
  onClick: (product: ProductsData) => void;
};

export default function ItemCard({ product, onClick }: ItemCardProps) {
  const navigate = useNavigate();

  return (
    <Card sx={ { width: 250, maxWidth: '100%', boxShadow: 'lg', height: 365 } }>
      <CardOverflow>
        <AspectRatio objectFit="contain">
          <img
            src={ product.thumbnail }
            loading="lazy"
            alt={ product.title }
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        {/* <Link
          data-testid="product-detail-link"
          sx={ { fontSize: { xs: 13, md: 15 } } }
          href={ `/details/${product.id}` }
          fontWeight="xl"
          fontSize="md"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={ <ArrowOutwardIcon /> }
        >
          {product.title}
        </Link> */}

        <Button onClick={ () => navigate(`/details/${product.id}`) }>
          {product.title}
        </Button>

        <Typography
          fontWeight="xl"
          sx={ { mt: 1 } }
          endDecorator={ product.shipping.free_shipping ? (
            <Chip
              component="span"
              size="sm"
              variant="soft"
              color="success"
              data-testid="free-shipping"
            >
              Frete grátis!
            </Chip>
          ) : (
            null
          ) }

        >
          {`R$ ${product.price}`}
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button
          variant="solid"
          color="success"
          size="lg"
          data-testid="product-add-to-cart"
          onClick={ () => onClick(product) }
        >
          Adicionar ao carrinho
        </Button>
      </CardOverflow>
    </Card>
  );
}
