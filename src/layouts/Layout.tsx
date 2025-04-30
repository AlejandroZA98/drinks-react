import {Outlet} from 'react-router-dom'
import Header from "../components/Header";
import Modal from '../components/Modal';
import { useAppStore } from '../stores/useAppStore';
import { useEffect } from 'react';
import Notification from '../components/Notification';
export default function Layout() {
  const loadFromStorage=useAppStore((state => state.loadFromStorage)) 


  useEffect(() => {
    loadFromStorage() // Carga los datos del local storage al iniciar la aplicacion
  },[])
  return (
    <>
      <Header></Header>
      <main className='container mx-auto  py-16'>
      <Outlet></Outlet> {/* Outlet renderiza el contenido de las rutas hijas */}
      </main>
      <Modal></Modal>
      <Notification />
    </>
  )
}
