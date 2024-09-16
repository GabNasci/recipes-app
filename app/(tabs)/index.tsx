import ModalCustom from '@/components/Modal';
import { Recipe } from '@/types/RecipeType';
import axios from 'axios';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, TextInput, Alert, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { ActivityIndicator, MD2Colors, Button, Searchbar, Card, Text } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {

    const [inputValue, setInputValue] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [recipes, setRecipes] = useState<Recipe[]>([])

    const getRecipes = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${inputValue}&apiKey=a9b670372ec945b9bca9cf780304842e`)
            if (!result) return Alert.alert("Não encontrado")
            setRecipes(result.data.results)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ alignItems: "center", padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Busque Receitas</Text>
                </View>
                <View style={{ alignItems: "center", padding: 20 }}>
                    <Searchbar
                        placeholder="Digite aqui"
                        onChangeText={newValue => setInputValue(newValue)}
                        value={inputValue ?? ""}
                    />
                    <Button style={{ marginTop: 10 }} mode="contained" onPress={getRecipes}>
                        Buscar
                    </Button>
                </View>
                <ScrollView>
                    <ActivityIndicator animating={loading} color={MD2Colors.blue300} />
                    {recipes.length ?
                        recipes.map(recipe => (
                            // <TouchableOpacity
                            //     onPress={() => router.push({
                            //         pathname: "./recipe",
                            //         params: { id: recipe.id }
                            //     })}
                            //     style={{ backgroundColor: "grey", padding: 20, margin: 20, alignItems: "center", gap: 10 }}
                            //     key={recipe.id}
                            // >

                            //     <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                            //         {recipe.title}
                            //     </Text>
                            //     <Image
                            //         source={{ uri: recipe.image }}
                            //         resizeMode='cover'
                            //         style={{ width: 300, height: 100 }}
                            //     />

                            // </TouchableOpacity>
                            <Card mode='contained' style={{marginBottom: 10, marginHorizontal: 20}} onPress={() => router.push({
                                pathname: "./recipe",
                                params: { id: recipe.id }
                            })}>
                                <Card.Content>
                                    <Text variant="titleLarge">{recipe.title}</Text>
                                </Card.Content>
                                <Card.Cover resizeMode='cover' source={{ uri: recipe.image }} />
                            </Card>

                        )) : ""
                    }
                </ScrollView>

            </View>
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
