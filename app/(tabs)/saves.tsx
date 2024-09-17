import { useRecipeDatabase } from "@/database/useRecipeDatabase";
import { RecipeType } from "@/types/RecipeType";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native"
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context"

const Saves = () => {

  const recipeDatabase = useRecipeDatabase()

  const [recipes, setRecipes] = useState<RecipeType[]>()


  const getSaveRecipes = async () => {
      try {
        const response = await recipeDatabase.getAllRecipes()
        setRecipes(response)
      console.log(response)
      
      } catch (error) {
        console.log(error)
      }
  }

  useFocusEffect(
    useCallback(() => {
      getSaveRecipes()
    }, [])
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          {recipes?.length ? 
            recipes.map(recipe => (
              <Card key={recipe.id} mode='contained' style={{marginBottom: 10, marginHorizontal: 20}} onPress={() => router.push({
                  pathname: "./recipe",
                  params: { id: recipe.id }
              })}>
                  <Card.Content>
                      <Text variant="titleLarge">{recipe.title}</Text>
                  </Card.Content>
                  <Card.Cover resizeMode='cover' source={{ uri: recipe.image }} />
              </Card>

          )) : <Text>Nenhuma Receita Salva.</Text>

          }
      </ScrollView>
    </SafeAreaView>
  );
}

export default Saves;