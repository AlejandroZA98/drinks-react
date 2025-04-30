import {StateCreator} from 'zustand'
import { FavoritesSliceType } from './favoritesSlice'

type Notification={
    text:string
    error:boolean
    show: boolean
}
export type NotificationsSliceType={
   notification:Notification
   showNotification:(payload:Pick<Notification,'text'|'error'>)=>void
   hideNotification:()=>void
}

export const createNotificationSlice:StateCreator<NotificationsSliceType & FavoritesSliceType,[],[],NotificationsSliceType>=(set)=>({
  notification:{
    text:'',
    error:false,
    show:false
  },
    showNotification:(payload)=>{
        set({
        notification:{
           text:payload.text,
           error:payload.error,
           show:true
        }
        })
        setTimeout(()=>{
        set({
            notification:{
                text:'',
                error:false,
                show:false
              }
        })
        },3000)
    },
    hideNotification:()=>{
        set({
            notification:{
                text:'',
                error:false,
                show:false
              }
        })
    }
})