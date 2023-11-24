import { Outlet, useNavigate, Link } from "react-router-dom"
import Bank from "../../assets/bank.svg"
import { Button, Nav, ImageLogo, InputSpace } from "./NavbarStyle"
import { useForm } from "react-hook-form"

export default function Navbar() {
    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    function onSearch(data) {
        const { titulo } = data
        navigate(`/search/${titulo}`)
        reset()
    }

    return (
        <>
            <Nav>
                <form onSubmit={handleSubmit(onSearch)}>
                    <InputSpace >
                        <button type="submit">
                            <i className="bi bi-search"></i>
                        </button>
                        <input {...register("titulo")} type="text" placeholder="Pesquise por título" />
                    </InputSpace>
                </form>

                <Link to="/">
                    <ImageLogo src={Bank} />
                </Link>

                <Button >Entrar</Button>
            </Nav>
            <Outlet />
        </>
    )
}