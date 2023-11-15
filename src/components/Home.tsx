
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
} from 'react-native';
import products from '../data/Recettes';
import { useFavoris } from '../hooks/Context';
import { Picker } from '@react-native-picker/picker';
import { toggleFavorite } from '../hooks/Favorite';


const Home = ({ navigation }) => {
  const numColumns = 2;
  const { favoris, toggleFavori } = useFavoris();

  const [productsList, setProductsList] = useState(products);
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    setFilteredList(products.filter((item) => item.categorie === filter));
  }, [filter]);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { product: item })}
        style={styles.productContent}
      >
        <Image source={{ uri: item.imagePath.uri }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleFavorite(item.id, productsList, setProductsList, toggleFavori )} style={styles.favoriteButton}>
        {favoris.includes(item.id) ? (
          <Image source={require('../images/favoris1.png')} style={styles.favoriteIcon} />
        ) : (
          <Image source={require('../images/favoris0.png')} style={styles.favoriteIcon} />
        )}
      </TouchableOpacity>
    </View>
  );

  const filterProducts = () => {
    if (filter === 'all') {
      setProductsList(products);
    } else {
      const filteredProducts = products.filter((product) => product.categorie === filter);
      setProductsList(filteredProducts);
    }
    setModalVisible(false);
  };

  const filteredProducts = productsList.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Liste de produits</Text>       
      </View>

      <View style={styles.searchAndFilter}>
        <TextInput
          style={styles.searchBar}
          placeholder="🔍Rechercher..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={require('../images/filtre.png')} style={styles.favoriteIcon}/>
          </TouchableOpacity>
        </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={numColumns}
      />

<Modal
  transparent={true}
  visible={modalVisible}
  animationType="slide"
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.modalContainer}>
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>

    <View style={styles.modalContent}>
      <Picker
        selectedValue={filter}
        onValueChange={(itemValue) => setFilter(itemValue)}
      >
        <Picker.Item label="Toutes les catégories" value="all" />
        <Picker.Item label="entrée" value="entrée" />
        <Picker.Item label="plat principal" value="plat principal" />
        <Picker.Item label="apéritif" value="apéritif" />
        <Picker.Item label="dessert" value="dessert" />
      </Picker>

      <TouchableOpacity onPress={filterProducts} style={{ backgroundColor: '#018AE9', padding: 15, borderRadius: 15 }}>
        <Text style={styles.filterButtonText}>Valider</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>   
  );
};


  

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
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
      shadowOpacity:0.5,
      shadowColor:"grey"
    },
    productContent: {
      alignItems: 'center',
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
    favoriteButton: {
      position: 'absolute',
      top: 1,
      right: 1,
      padding: 10,
    },
    favoriteIcon: {
      width: 35,
      height: 35,
    },
    
    filterButton: {
      fontSize: 18,
      color: 'blue',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 16,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

    
    filterButtonText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    searchAndFilter:{
      padding:10,
      flexDirection:"row",
      justifyContent: "space-around",
    },
    searchBar:{
      fontSize:18,
      borderWidth:1,
      padding:10,
      borderRadius:50,
      width:320
    }
  });
  
  export default Home;
