import { Outlet, useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"

import Bank from "../../assets/bank.svg"

import { Button, Nav, ImageLogo, InputSpace, ErrorSpan } from "./NavbarStyle"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const searchSchema = z.object({
    title: z
        .string()
        .min(1, { message: "A pesquisa não pode ser vazia" })
        .refine(value => !/^\s*$/.test(value), { message: "A pesquisa não pode ser vazia" })
})

export default function Navbar() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(searchSchema)
    })
    const navigate = useNavigate()

    function onSearch(data) {
        const { title } = data
        navigate(`/search/${title}`)
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
                        <input {...register("title")} type="text" placeholder="Pesquise por título" />
                    </InputSpace>
                </form>

                <Link to="/">
                    <ImageLogo src={Bank} />
                </Link>

                <Button >Entrar</Button>
            </Nav>
            {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
            <Outlet />
        </>
    )
}