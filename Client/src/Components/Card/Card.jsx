import { CardContainer, CardBody, CardFooter } from "./CardStyles"
import { TextLimit } from "../TextLimit/TextLimit"

export default function Card(props) {
    return (
        <>
            <CardContainer>
                <CardBody>
                    <div>
                        <h2>{props.titulo}</h2>
                        <img src={props.imagem} alt="img" />
                    </div>
                    <TextLimit limit={2} text={props.texto}/>
                </CardBody>

                <CardFooter>
                    <div>
                        <i className="bi bi-hand-thumbs-up"></i>
                        <span>{props.likes}</span>
                    </div>

                    <div>
                        <i className="bi bi-chat"></i>
                        <span>{props.comentarios}</span>
                    </div>
                </CardFooter>
            </CardContainer>
        </>
    )
}