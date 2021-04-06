import React, { useEffect, useState } from "react";
import "./App.css";
import Products from "./components/products";
import ProductLoadingComponent from "./components/productLoading";
import { API } from "./apiService";

function App() {
  const ProductLoading = ProductLoadingComponent(Products);
  const [appState, setAppState] = useState({
    loading: false,
    products: null,
  });
  useEffect(() => {
    setAppState({ loading: true });
    API.products().then((products) => {
      setAppState({ loading: false, products: products });
    });
  }, [setAppState]);
  return (
    <div className="App">
      <h1>Products</h1>
      <ProductLoading
        isLoading={appState.loading}
        products={appState.products}
      />
    </div>
  );
}

export default App;
