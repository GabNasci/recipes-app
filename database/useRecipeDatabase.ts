import { RecipeType } from "@/types/RecipeType"
import { useSQLiteContext } from "expo-sqlite"

export function useRecipeDatabase() {
    const database = useSQLiteContext()

    async function save(data: RecipeType) {
        const recipeStatement = await database.prepareAsync(`
                INSERT INTO recipes (id, title, image, minutes) VALUES ($id, $title, $image, $minutes);
            `)

        const ingridientStatement = await database.prepareAsync(`
                INSERT INTO ingridient (id, name, recipe_id) VALUES ($id, $name, $recipe_id);
            `)

        try {
            await recipeStatement.executeAsync({
                $id: data.id,
                $title: data.title,
                $image: data.image,
                $minutes: data.readyInMinutes
            })

            for( const ingridient of data.extendedIngredients) {
                await ingridientStatement.executeAsync({
                    $id: ingridient.id,
                    $name: ingridient.name,
                    $recipe_id: data.id
                })
            }


        } catch (error) {
            throw error
        } finally {
            recipeStatement.finalizeAsync()
            ingridientStatement.finalizeAsync()
        }
    }

    async function getAllRecipes() {
        try {
            const query = "SELECT * FROM recipes"

            const response = await database.getAllAsync(query)

            return response
        } catch (error) {
            
        }
    }

    async function getAllIngridients(id: number) {
        try {
            const query = "SELECT * FROM ingridients WHERE recipe_id = $id"

            
        } catch (error) {
            
        }
    }

return {save}
}

