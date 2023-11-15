import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import products from '../data/Recettes';

const categories = [
  { label: 'Dessert', value: 'Dessert' },
  { label: 'Plat principal', value: 'Plat principal' },
  { label: 'entrée', value: 'entrée' },
  { label: 'apéritif', value: 'apéritif' },
];

const initialState = {
  recipes: products,
};

const reducer = (state, action) => {
  switch (action.type) {

    case 'ADD_RECIPE':
      console.log('action: ', action);
      
      return {
        ...state,
        recipes: [
          ...state.recipes,
          {     
          id: state.recipes.lenght + 1,    
          title:action.title,
          category: action.categorie,
          description: action.description,
          isFavorite: false,
          imageUri: action.imageUri,
          videoPath: action.videoPath,
          },
        ],
      };
    default:
      return state;
  }
};



const AddRecette = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [image, setImage] = React.useState('');
  const [video, setVideo] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [categorie, setCategorie] = React.useState('');
  const [productsList, setProductsList] = useState(products);

  const handleAddRecette = () => {
    
    dispatch({ type: 'ADD_RECIPE', image, video, title, description, categorie });
    //console.log('Recette ajoutée avec succès !', state);
  };

async function onImportFromGalleryPress() {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
                                          mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                          allowsEditing: true,
                                          aspect: [4, 3],
                                          quality: 1,
          });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      } catch (error) { console.log({ error }) }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ajouter une recette</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre de la recette"
        value={title}
        onChangeText={setTitle}
      />
      <RNPickerSelect
        style={pickerSelectStyles}
        value={categorie}
        onValueChange={setCategorie}
        placeholder={{ label: 'Sélectionnez une catégorie', value: null }}
        items={categories}
      />
      <TextInput
        style={styles.input}
        placeholder="URL video"
        value={video}
        onChangeText={setVideo}
      />
      <TouchableOpacity style={styles.buttonImport} onPress={() => onImportFromGalleryPress()}>
        <Text>Parcourir dans image</Text>
      </TouchableOpacity>
      
      

      <TextInput
        style={{
          height: 100,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 4,
          paddingLeft: 8,
          marginTop: 30,
          marginBottom: 30,
        }}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddRecette}>
        <Text style={styles.addButtonText}>Ajouter la recette</Text>
      </TouchableOpacity>
    </View>
  );
};


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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    margin: 10,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonImport:{
        backgroundColor: '#52D8FF',
        padding: 20,
        borderRadius: 8,
        alignSelf:"center",
        marginBottom:30,
        width:300
      },
      selectedImage: {
        width: 50, 
        height: 50, 
        marginTop: 10,
      },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    margin: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default AddRecette;
