import { CardContainer, CardBody, CardFooter } from "./CardStyles"


export default function Card({ news }) {
    return (
        <>
            <CardContainer>
                <CardBody>
                    <div>
                        <h2>{news.titulo}</h2>
                        <p>{news.texto}</p>
                    </div>
                    <img src={news.imagem} alt="img" />
                </CardBody>

                <CardFooter>
                    <div>
                        <i className="bi bi-hand-thumbs-up"></i>
                        <span>{news.likes}</span>
                    </div>

                    <div>
                        <i className="bi bi-chat"></i>
                        <span>{news.comentarios}</span>
                    </div>
                </CardFooter>
            </CardContainer>
        </>
    )
}