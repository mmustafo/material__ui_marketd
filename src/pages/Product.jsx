import { useLoaderData } from "react-router-dom";
import { axiosInstance } from "../utils";

export const loader = async ({ params }) => {
  const req = await axiosInstance(`/product/${params.id}`);
  return req.data;
};

function Product() {
  const data = useLoaderData();
  console.log(data);
  return <div className="product__item">
    <img src={data.thumbnail} alt={data.title} />
    <h2>{data.title}</h2>
    <h4>{data.price}$</h4>
    <h4>{data.brand}</h4>
    <p>{data.description}$</p>

  </div>;
}

export default Product;
