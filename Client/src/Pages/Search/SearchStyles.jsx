import styled from "styled-components"

export const ContainerResults = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 20px;

    & img{
        width: 50%;
    }
`

export const SearchNews = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin: 20px auto;
    width: 80%;
`

export const TextResult = styled.div`
    padding: 30px;
    background-color:  #fff;
    width: 80%;
    border-radius: 6px;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    
    & span{
        font-size: 20px;
    }
`