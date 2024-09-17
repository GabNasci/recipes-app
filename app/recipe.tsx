import { useRecipeDatabase } from "@/database/useRecipeDatabase";
import { RecipeType } from "@/types/RecipeType";
import axios from "axios";
import { useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, FlatList, Image, Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Recipe = () => {

    const { id } = useGlobalSearchParams()

    const [recipe, setRecipe] = useState<RecipeType>()

    const recipeDatabase = useRecipeDatabase()

    const getRecipe = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=a9b670372ec945b9bca9cf780304842e`)
            if (!response) return Alert.alert("Não encontrada")
            setRecipe(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [recipe])

    const handleSave = async () => {
        try {
            if(!recipe) return Alert.alert("Não foi possível salvar a receita.")
            await recipeDatabase.save(recipe)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRecipe()
    }, [getRecipe])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
            {recipe ?
                <View>
                    <Text>{recipe.title}</Text>
                    <Image 
                        source={{uri: recipe.image}}
                        resizeMode="cover"
                        style={{width: 300, height: 200}}                   
                    />
                    <Text>{recipe.readyInMinutes + " minutos"}</Text>
                    {recipe.extendedIngredients.map((ingridient, key) => (
                        <Text key={key}>{ingridient.name}</Text>
                    ))}
                    <Button title="Salvar" onPress={handleSave}/>

                </View>: <ActivityIndicator animating={true} color={MD2Colors.blue300} />
            }

        </SafeAreaView>
    );
}

export default Recipe;