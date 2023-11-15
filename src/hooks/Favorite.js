
export const toggleFavorite = (productId, productList, setProductList, toggleFavori) => {
    setProductList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, isFavorite: !product.isFavorite } : product
      )
    );
  
    toggleFavori(productId);
  };
  