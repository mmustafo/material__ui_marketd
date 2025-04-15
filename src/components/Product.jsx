import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import {
  addToCart,
  decrementAmount,
  incrementAmount,
} from "../app/feature/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Product({ product }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);
  const isAdded = cart.find((i) => i.id == product.id);
  const handleBuy = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        ...product,
        amount: 1,
      })
    );
  };
  return (
    <Link to={`/product/${product.id}`}>
      <h2>{product.title}</h2>
      {isAdded && (
        <>
          <Button
            onClick={(e) => {
              dispatch(incrementAmount(product.id));
              e.preventDefault();
            }}
          >
            +
          </Button>
          <Box component="span" sx={{ color: "#fff" }}>
            {isAdded.amount}
          </Box>
          <Button
            onClick={(e) => {
              dispatch(decrementAmount(product.id));
              e.preventDefault();
            }}
          >
            -
          </Button>
        </>
      )}

      {!isAdded && (
        <Button
          onClick={(e) => handleBuy(e)}
          sx={{
            backgroundColor: "orange",
          }}
        >
          buy
        </Button>
      )}
    </Link>
  );
}
export default Product;
