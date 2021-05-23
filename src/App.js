import React, { useEffect, useState } from "react";
import "./App.css";
import Products from "./components/Products";
import ProductLoadingComponent from "./components/ProductLoading";
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
      <ProductLoading
        isLoading={appState.loading}
        products={appState.products}
      />
    </div>
  );
}

export default App;
