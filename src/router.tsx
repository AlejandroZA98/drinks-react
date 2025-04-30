import {lazy,Suspense} from 'react'
import  {BrowserRouter, Route, Routes} from 'react-router-dom'   
import Layout from './layouts/Layout'
// mejoras para build en performance
const FavoritosPage = lazy(() => import('./views/FavoritosPage'))
const IndexPage = lazy(() => import('./views/IndexPage'))

export default function AppRouter() {
  return (
        <BrowserRouter>
            <Routes>
                {/* Route englova renderiza en las paginas lo que se encuentre en layout */}
                <Route element={<Layout></Layout>}> 
                    <Route path="/" element={
                        <Suspense fallback="Cargando..">
                        <IndexPage/>
                    </Suspense>} index/>
                        
                    <Route path="/favoritos" element={

                        <Suspense fallback="Cargando..">
                            <FavoritosPage/>
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
)
}
