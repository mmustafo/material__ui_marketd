export const loader = async () => {
     const req = axiosInstance("/products")
     return req
}
import { useLoaderData } from "react-router-dom";
import { useFatch } from "../hooks/useFatch";
import { axiosInstance } from "../utils";
import ProductList from "../components/ProductList";

function Home() {
     const {data: {products}} = useLoaderData()
  return <div>
     <ProductList/>
  </div>;
}

export default Home;
