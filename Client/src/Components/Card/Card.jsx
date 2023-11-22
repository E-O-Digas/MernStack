import { CardContainer, CardBody, CardFooter, CardHeader } from "./CardStyles"
import { TextLimit } from "../TextLimit/TextLimit"

export default function Card(props) {
    return (
        <>
            <CardContainer>
                <CardBody>
                    <div>
                        <CardHeader top={props.top}>
                            <h2>{props.titulo}</h2>

                            <TextLimit limit={2} text={props.texto} />
                        </CardHeader>

                        <CardFooter>
                            <section>
                                <i className="bi bi-hand-thumbs-up"></i>
                                <span>{props.likes?.length}</span>
                            </section>

                            <section>
                                <i className="bi bi-chat"></i>
                                <span>{props.comentarios?.length}</span>
                            </section>
                        </CardFooter>
                    </div>
                    <img src={props.imagem} alt="img" />
                </CardBody>
            </CardContainer>
        </>
    )
}