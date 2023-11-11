import Bank from "../../assets/bank.svg"
import { Button, Nav, ImageLogo, InputSpace } from "./NavbarStyle"

export default function Navbar() {
    return (
        <>
            <Nav>
                <InputSpace >
                    <i class="bi bi-search"></i>
                    <input type="text" placeholder="Pesquise por título" />
                </InputSpace>

                <ImageLogo src={Bank} />
                <Button >Entrar</Button>
            </Nav>
        </>
    )
}