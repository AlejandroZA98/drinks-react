import { StateCreator } from "zustand"
import { getCategories, getRecipies,getRecipeByID } from "../services/RecipeService"
import type { Categories, Drink,Drinks, Recipe, SearchFilter } from "../types"

export type RecipiesSliceType={
    categories:Categories
    drinks: Drinks
    selectedRecipie: Recipe
    modal:boolean
    fetchCategories:()=>Promise<void>
    searchRecipes:(searchFilters:SearchFilter)=>Promise<void>
    selectRecipe:(id:Drink['idDrink'])=>Promise<void>
    closeModal:()=>void
}
export const createRecipiesSlice:StateCreator<RecipiesSliceType>=(set)=>({ // StateCreator<RecipiesSliceType> define el tipo de creador de estado
    categories:{
        drinks:[]
    },
    drinks:{
        drinks:[]
    },
    selectedRecipie:{} as Recipe,
    modal:false,
    fetchCategories:async()=>{
        const categories =await getCategories()
        set({
            categories:categories
        }) 
    },
    searchRecipes:async(filters)=>{
        console.log('Buscando recetas',filters)
        const drinks = await getRecipies(filters)
        console.log(drinks)
        set({
            drinks:drinks
        })
    },
    selectRecipe:async(id)=>{
        console.log('Seleccionando receta',id)
        const selectedRecipe = await getRecipeByID(id)
        console.log(selectedRecipe)
        set({
            selectedRecipie:selectedRecipe,
            modal:true
        })

    },
    closeModal:()=>{
        set({
            modal:false,
            selectedRecipie:{} as Recipe

        })
    }
})