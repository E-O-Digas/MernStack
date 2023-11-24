import { HomeContainer, HomeHeader } from "./HomeStyles"
import Card from "../../Components/Card/Card.jsx"

import { getAllNews, getTopNews } from "../../services/postsServices.js"

import { useState, useEffect } from "react"

export default function Home() {
    const [news, setNews] = useState([])

    const [topNews, setTopNews] = useState({})

    async function findAllNews() {
        const news = await getAllNews()
        setNews(news.data.result)

        const topNews = await getTopNews()
        setTopNews(topNews.data.news)
    }

    useEffect(() => {
        findAllNews()
    }, [])

    return (
        <>
            <HomeHeader>
                <Card
                    top={true}
                    titulo={topNews.titulo}
                    texto={topNews.texto}
                    imagem={topNews.imagem}
                    likes={topNews.likes}
                    comentarios={topNews.comentarios}
                />
            </HomeHeader>
            <HomeContainer >
                {news.map((item) => <Card
                    key={item.id}
                    titulo={item.titulo}
                    texto={item.texto}
                    imagem={item.imagem}
                    likes={item.likes}
                    comentarios={item.comentarios}
                />
                )}
            </HomeContainer>
        </>
    )
}