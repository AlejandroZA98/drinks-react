import { ChangeEvent, FormEvent, useEffect, useMemo,useState } from "react"
import { NavLink,useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
export default function Header() {
    const [searchFilters,setSearchFilters] = useState({
        ingredient:'',
        category:'',
    }) // state de busqueda
    const {pathname} = useLocation()
    console.log(pathname)
    const isHome = useMemo(()=>pathname === '/',[pathname]) 

    const fetchCategories = useAppStore((state)=>state.fetchCategories)
    const categories = useAppStore((state)=>state.categories)
    const searchRecipes = useAppStore((state)=>state.searchRecipes)
    const showNotification = useAppStore((state)=>state.showNotification)


    console.log("CATEGORIAS",categories)
    useEffect(()=>{
        fetchCategories()
    },[])

    const handleChange=(e:ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLSelectElement>)=>{
        setSearchFilters({
            ...searchFilters,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(searchFilters)
        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text:'Todos los campos son obligatorios',
                error:true})
            
            return
       }
       searchRecipes(searchFilters)
    }
  return (
        <header className={isHome ?'bg-[url("./public/bg.jpg")]  bg-center bg-cover':'bg-slate-800'}>
            <div className='mx-auto container px-5 py-16'>
                <div className='flex justify-between items-center'>
                    <div>
                    <img src="/logo.svg" className='w-32' alt="logotipo" />

                    </div>
                    <nav className="flex gap-4">
                        <NavLink to="/" className={({isActive})=>
                        isActive?'text-orange-500 text-1xl uppercase font-bold':'text-white text-1xl uppercase font-bold'}>Inicio</NavLink>
                        <NavLink to="/favoritos" className={({isActive})=>
                        isActive?'text-orange-500 text-1xl uppercase font-bold':'text-white text-1xl uppercase font-bold'}>Favoritos</NavLink>

                    </nav>
                </div>
                {
                    isHome && (
                       <form onSubmit={handleSubmit}
                       className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                            <div className="space-y-4">
                                <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">
                                    Nombre o Ingredientes
                                </label>

                                <input type="text" id='ingredient' name="ingredient" className="p-3 w-full rounded-lg focus:outline-none bg-white"
                                placeholder="Nombre o ingrediente. Ej. Vodka,Tequilla Cafe" onChange={handleChange} value={searchFilters.ingredient}/>
                            </div>

                            <div className="space-y-4">
                                <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">
                                    Categoria
                                </label>

                                <select name="category" id="category" className="p-3 w-full rounded-lg focus:outline-none bg-white" onChange={handleChange} value={searchFilters.category}>
                                    <option value="">--Seleccione--</option>
                                    {
                                        categories.drinks.map((category)=>(
                                            console.log(category),
                                            <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <input type="submit" value="Buscar Recetas" className="cursor-pointer bg-orange-800 hover:bg-orange-900 
                            text-white font-extrabold w-full p-2 rounded-lg uppercase" />

                       </form>
                    )
                }
            </div>

        </header>

)
}
