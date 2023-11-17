import styled from "styled-components"


export const CardContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;

    border-radius: 20px;
    padding-top: 20px;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 5px;
    box-shadow: #32326926 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
`

export const CardBody = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    & > div{
        display:flex;
        align-items: center;
        & > h2{
            margin-bottom: 20px;
        }
        
        & > img {
            width: 30%;
            object-fit: cover;
            object-position: center;
        }
    }

    &p{
        font-size: 0.75rem;
    }
`

export const CardFooter = styled.article`
    display: flex;
    align-items: center;
    gap: 15px;

`