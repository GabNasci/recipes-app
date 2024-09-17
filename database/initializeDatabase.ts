import { type SQLiteDatabase } from "expo-sqlite";


// export type RecipeType = {
//     id: number,
//     title: string,
//     image: string,
//     readyInMinutes: number,
//     extendedIngredients: IngridientType[]
// }

// type IngridientType = {
//     id: number,
//     name: string
// }

export async function initializeDatabase(database: SQLiteDatabase) {


    await database.execAsync(`
        DROP TABLE IF EXISTS recipes;
    `)

    await database.execAsync(`
        DROP TABLE IF EXISTS ingridients;
    `)

    await database.execAsync(`
            CREATE TABLE IF NOT EXISTS recipes (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                image TEXT NOT NULL,
                minutes INTEGER NOT NULL
            );
        `)

    await database.execAsync(`
            CREATE TABLE IF NOT EXISTS ingridients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                recipe_id INTEGER,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
            );
        `)

}