import axios from 'axios'
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from '../schemas/recipies-schema'
import { Drink, SearchFilter } from '../types'
export async function getCategories() {
    console.log('llamando a la api desde Recipe')
    const url='https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data}=await axios(url)
    console.log(data)
    const  result=CategoriesAPIResponseSchema.safeParse(data)
    console.log(result)
    if(result.success){
        return result.data
    }
}

export async function getRecipies(filters:SearchFilter){
    console.log(filters)
    const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const {data}=await axios(url)
    console.log(data)
    const result=DrinksAPIResponse.safeParse(data)
    console.log(result)
    if(result.success){
        return result.data
    }
}

export async function getRecipeByID(id:Drink['idDrink']){
    console.log('llamando a la api desde Recipe')
    const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data}=await axios(url)
    console.log(data)
    const result=RecipeAPIResponseSchema.safeParse(data.drinks[0])
    console.log(result)
    if (result.success){
        return result.data
    }
}