import {z} from "zod";
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../schemas/recipies-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drinks = z.infer<typeof DrinksAPIResponse>;
export type Drink = z.infer<typeof DrinkAPIResponse>; // Extrae el tipo de bebida de la respuesta de la API
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>; // Extrae el tipo de receta de la respuesta de la API