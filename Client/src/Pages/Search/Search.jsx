import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { searchNews } from "../../services/postsServices.js"

import { ContainerResults, SearchNews, TextResult } from "./SearchStyles.jsx"
import Card from "../../Components/Card/Card.jsx"

export default function Search() {
    const { title } = useParams()
    const [news, setNews] = useState([])

    async function search() {
        try {
            const newsApi = await searchNews(title)
            setNews(newsApi.data.result)
        } catch (err) {
            console.log(err)
            setNews([])
        }
    }

    useEffect(() => {
        search()
    }, [title])

    return (
        <>
            <ContainerResults>
                <TextResult>
                    <span>
                        {news.length
                            ? `Encontramos ${news.length} 
                            ${news.length > 1 ? "resultados" : "resultado"} para: `
                            : "Não encontramos nenhum resultado para:"}
                    </span>
                    <h2>{title}</h2>
                </TextResult>
                <SearchNews>
                    {news.map((item) => <Card
                        key={item.id}
                        titulo={item.titulo}
                        texto={item.texto}
                        imagem={item.imagem}
                        likes={item.likes}
                        comentarios={item.comentarios}
                    />
                    )}
                </SearchNews>
            </ContainerResults>
        </>
    )
}