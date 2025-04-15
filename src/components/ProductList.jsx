import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementAmount,
  decrementAmount,
} from "../app/feature/cartSlice";
import { motion } from "framer-motion";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProductCard = styled(Card)(() => ({
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: "16px",
  backgroundColor: "#00695c",
  border: "2px solid #004d40",
  flex: "wrap",

  transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    border: "2px solid #607d8b",
  },
  overflow: "hidden",
}));

const ProductImage = styled("img")(() => ({
  width: "100%",
  objectFit: "cover",
  borderRadius: "8px",
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  minWidth: 36,
  height: 36,
  fontWeight: "bold",
}));

function ProductList() {
  const {
    data: { products },
  } = useLoaderData();

  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);

  const handleBuy = (product) => {
    const isAdded = cart.find((item) => item.id === product.id);
    if (!isAdded) {
      dispatch(addToCart({ ...product, amount: 1 }));
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" align="center" gutterBottom sx={{ my: 4 }}>
        All Products
      </Typography>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3} sx={{ flexWrap: "wrap" }}>
          {products.map((product) => {
            const isAdded = cart.find((item) => item.id === product.id);
            const amount = isAdded ? isAdded.amount : 0;
            return (
              <Grid
                columns={12}
                style={{ gridColumn: "span 4" }}
                key={product.id}
              >
                <motion.div variants={itemVariants}>
                  <ProductCard>
                    <ProductImage
                      src={product.thumbnail}
                      alt={product.title}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1561154464-82e9adf32764";
                      }}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" color="white">
                          {product.title}
                        </Typography>
                        <Typography color="white" variant="body2" sx={{ mt: 1 }}>
                          {product.description.slice(0, 80)}...
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                          ${product.price}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: amount > 0 ? "center" : "start",
                        }}
                      >
                        {isAdded && amount > 0 ? (
                          <>
                            <ActionButton
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                dispatch(incrementAmount(product.id))
                              }
                            >
                              +
                            </ActionButton>
                            <Typography sx={{ mx: 1 }}>{amount}</Typography>
                            <ActionButton
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                dispatch(decrementAmount(product.id))
                              }
                            >
                              -
                            </ActionButton>
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            color="warning"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={() => handleBuy(product)}
                          >
                            Buy
                          </Button>
                        )}
                      </Box>
                      <MuiLink
                        component={RouterLink}
                        to={`/product/${product.id}`}
                        sx={{
                          mt: 5,
                          cursor: "pointer",
                          backgroundColor: "orange",
                          maxWidth: 160,
                          mx: "auto",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          color: "#fff",
                          textDecoration: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#e65100",
                          },
                        }}
                      >
                        batafsil
                      </MuiLink>
                    </CardContent>
                  </ProductCard>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>
    </Container>
  );
}

export default ProductList;
