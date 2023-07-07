import { ProductDetailsData } from '../types';

type AttributesProps = {
  productInfo: ProductDetailsData;
};

function Attributes({ productInfo }: AttributesProps) {
  return (
    <section>
      <h2>Informações Técnicas</h2>
      <ul>
        <li>
          {`${productInfo.attributes[0]?.name}: ${productInfo.attributes[0]?.value_name}`}
        </li>
        <li>
          {`${productInfo.attributes[1]?.name}: ${productInfo.attributes[1].value_name}`}
        </li>
        <li>
          {`${productInfo.attributes[2]?.name}: ${productInfo.attributes[2].value_name}`}
        </li>
        <li>
          {`${productInfo.attributes[3]?.name}: ${productInfo.attributes[3].value_name}`}
        </li>
        <li>
          {`${productInfo.attributes[4]?.name}: ${productInfo.attributes[4].value_name}`}
        </li>
      </ul>
    </section>
  );
}

export default Attributes;
