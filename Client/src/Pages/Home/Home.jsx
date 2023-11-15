import { HomeContainer } from "./HomeStyles"


import Navbar from "../../Components/Navbar/Navbar.jsx"
import Card from "../../Components/Card/Card.jsx"

import { news } from "../../Data.js"

export default function Home() {
    return (
        <>
            <Navbar />
            <HomeContainer >
                {news.map((item, index) => {
                    return <Card key={index} news={item} />
                })}
            </HomeContainer>
        </>
    )
}