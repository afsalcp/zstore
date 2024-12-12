

type Opts={
    title:string,
    icon:string,
    path:string
}

const opts:Opts[]=[
    {
        title:'Home',
        'icon':'fa-solid fa-house',
        path:"/home",
    },
    {
        title:'Cart',
        icon:'fa-solid fa-cart-shopping',
        path:"/cart"
    },
    {
        title:'Favorites',
        icon:'fa-solid fa-heart',
        path:"/favs"
    },
    {
        title:"Profile",
        icon:"fa-solid fa-user",
        path:'/profile'
    }
]

export default opts