// FavorisContext.js
import { createContext, useContext, useState } from 'react';

const FavorisContext = createContext();

export const FavorisProvider = ({ children }) => {
  const [favoris, setFavoris] = useState([]);

  const toggleFavori = (productId) => {
    setFavoris((prevFavoris) =>
      prevFavoris.includes(productId)
        ? prevFavoris.filter((id) => id !== productId)
        : [...prevFavoris, productId]
    );
  };


  return (
    <FavorisContext.Provider value={{ favoris, toggleFavori }}>
      {children}
    </FavorisContext.Provider>
  );
};

export const useFavoris = () => {
  return useContext(FavorisContext);
};
