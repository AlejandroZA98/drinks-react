import {StateCreator} from 'zustand'
import { Recipe } from '../types'
import { createNotificationSlice, NotificationsSliceType } from './notificationSlice'
import { RecipiesSliceType } from './recipieSlice'

export type FavoritesSliceType={
    Favorites:Recipe[]
    handleClickFavorite:(recipe:Recipe)=>void
    favoriteExists:(id:Recipe['idDrink'])=>boolean
    loadFromStorage:()=>void
}

export const createFavoritesSlice:StateCreator<FavoritesSliceType & RecipiesSliceType & NotificationsSliceType,[],[],FavoritesSliceType>=(set,get,api)=>({
    Favorites:[],
    handleClickFavorite:(recipe)=>{
        console.log('Receta favorita',recipe)
        if (get().favoriteExists(recipe.idDrink)){
          console.log('Receta ya favorita')
            set({
                Favorites:get().Favorites.filter(favorite=>favorite.idDrink!==recipe.idDrink)
            })
            // set((state)=>({
            //     Favorites:state.Favorites.filter(favorite=>favorite.idDrink!==recipe.idDrink) // es lo mismo que la parte de arriba
            // }))
            createNotificationSlice(set,get,api).showNotification({text:'Se Elimino de Favoritos',error:false}) // Mostrar notificacion de que se elimino de favoritos
        }else{
            console.log('Receta no favorita')
            set({
                Favorites:[...get().Favorites,recipe]
            })
            // set((state)=>({
            //     Favorites:[...state.Favorites,recipe] // es lo mismo que la parte de arriba
            // }))
            createNotificationSlice(set,get,api).showNotification({text:'Se Agrego a Favoritos',error:false}) // Mostrar notificacion de que se elimino de favoritos
        }
        localStorage.setItem('favorites',JSON.stringify(get().Favorites)) // Guardar en localStorage
    },
    favoriteExists:(id)=>{
        return get().Favorites.some(favorite=>favorite.idDrink===id)
    },
    loadFromStorage:()=>{
        const storedfavorites = localStorage.getItem('favorites')
        if (storedfavorites){
            set({
                Favorites:JSON.parse(storedfavorites)
            })
        }
    }
})