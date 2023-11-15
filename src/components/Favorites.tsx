

import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavoris } from '../hooks/Context';
import products from '../data/Recettes';
import { useNavigation } from '@react-navigation/native';

const Favorites = () => {
  const { favoris, toggleFavori } = useFavoris();
  const navigation = useNavigation();
  // Filtrer les produits pour n'afficher que les favoris
  const favoriteProducts = products.filter((item) => favoris.includes(item.id));

// Fonction pour retirer un produit des favoris
const handleRemoveFromFavorites = (productId) => {
  
  toggleFavori(productId);
};

 
  const renderProductItem = ({ item }) => (
    <View style={styles.productItemContainer}>
      <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { product: item })}
      >
        <Image source={{ uri: item.imagePath.uri }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
      </TouchableOpacity>
    
      <TouchableOpacity onPress={() => handleRemoveFromFavorites(item.id)} >
        <Image source={require('../images/remove.png')} style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );

  

  

  // Rendre le composant Favorites
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Produits Favoris</Text>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
      
    </View>
  );
};

// Styles pour le composant Favorites
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productItemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    padding: 10,
    position: 'relative',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  productTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
 
  removeIcon: {
    width: 30,
    height: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    margin: 8,
  },
});

// Exportez le composant Favorites
export default Favorites;
