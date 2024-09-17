export type RecipeType = {
    id: number,
    title: string,
    image: string,
    readyInMinutes: number,
    extendedIngredients: IngridientType[]
}

type IngridientType = {
    id: number,
    name: string
}