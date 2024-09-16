import ModalCustom from '@/components/Modal';
import { Recipe } from '@/types/RecipeType';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, Text, TextInput, Alert, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {

    const [inputValue, setInputValue] = useState<string>()
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [recipeSelected, setRecipeSelected] = useState<Recipe>()
    const [visible, setVisible] = useState(false)

    const getRecipes = useCallback(async () => {
        try {
            const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${inputValue}&apiKey=a9b670372ec945b9bca9cf780304842e`)
            if (!result) return Alert.alert("Não encontrado")
            setRecipes(result.data.results)

        } catch (error) {
            console.log(error)
        }
    }, [inputValue])

    const handleModal = (recipe: Recipe) => {
        setRecipeSelected(recipe)
        setVisible(true)
    }


    useEffect(() => {
        getRecipes()
    }, [getRecipes])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ alignItems: "center", padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Busque Receitas</Text>
                </View>
                <View style={{ alignItems: "center", padding: 20 }}>
                    <TextInput
                        placeholder='digite aqui'
                        onChangeText={newValue => setInputValue(newValue)}
                        value={inputValue}
                        style={{ width: 300, borderWidth: 1, borderColor: "grey", borderRadius: 8, height: 40, padding: 10 }}
                    />
                </View>
                <ScrollView>
                    {recipes ?
                        recipes.map(recipe => (
                            <TouchableOpacity
                                onPress={() => handleModal(recipe)}
                                style={{ backgroundColor: "grey", padding: 20, margin: 20, alignItems: "center", gap: 10 }}
                                key={recipe.id}
                            >

                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                                    {recipe.title}
                                </Text>
                                <Image
                                    source={{ uri: recipe.image }}
                                    resizeMode='cover'
                                    style={{ width: 300, height: 100 }}
                                />

                            </TouchableOpacity>

                        )) : <Text>Carregando...</Text>
                    }
                </ScrollView>

            </View>

            <Modal
                animationType="fade"
                visible={visible}
                transparent={true}
                style={{
                    position: "absolute",
                    top: 200
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{recipeSelected?.title}</Text>
                        <Button
                            title='Fechar'
                            onPress={() => setVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
