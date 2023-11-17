import { HomeContainer } from "./HomeStyles"
import Navbar from "../../Components/Navbar/Navbar.jsx"
import Card from "../../Components/Card/Card.jsx"

import { getAllNews } from "../../services/postsServices.js"

import { useState, useEffect } from "react"

export default function Home() {
    const [news, setNews] = useState([])

    async function findAllNews() {
        const response = await getAllNews()
        setNews(response.data.result)
    }

    useEffect(() => {
        findAllNews()
    }, [])

    return (
        <>
            <Navbar />
            <HomeContainer >
                {news.map((item) => <Card
                    key={item.id}
                    titulo={item.titulo}
                    texto={item.texto}
                    imagem={item.imagem}
                    likes={item.likes.length}
                    comentarios={item.comentarios.length}
                />
                )}
            </HomeContainer>
        </>
    )
}