import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import products from '../data/Recettes';
import { useFavoris } from '../hooks/Context';
import { toggleFavorite } from '../hooks/Favorite';
//import YoutubeButton from '../hooks/YoutubeLinking';

const Detail = ({ route }) => {
  const { product } = route.params;
  const [productsList, setProductsList] = useState(products);
  const { favoris, toggleFavori } = useFavoris();

  const openYoutubeApp = (url) => {
    
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Détails du produit</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(product.id, productsList, setProductsList, toggleFavori )} style={styles.favoriteButton}>
        {favoris.includes(product.id) ? (
          <Image source={require('../images/favoris1.png')} style={styles.favoriteIcon} />
        ) : (
          <Image source={require('../images/favoris0.png')} style={styles.favoriteIcon} />
        )}
      </TouchableOpacity>
      <Image source={{ uri: product.imagePath.uri }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      
      <TouchableOpacity onPress={()=>openYoutubeApp(product.videoPath.url)}>
      <Image source={require('../images/youtube.png')} style={{ alignSelf: 'center' }} />
    </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    marginTop:30,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  productTitle: {
    marginTop:10,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 20,
  },

  favoriteButton: {
    position: 'absolute',
    top: 1,
    right: 1,
    padding: 10,
  },
  favoriteIcon: {
    width: 60,
    height: 60,
  },
});

export default Detail;
