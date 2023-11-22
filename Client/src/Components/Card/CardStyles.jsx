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
    width: 100%;
    height: 100%;

    & div{
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        width: 100%;
        
        & img{
            width: 40%;
            object-fit: cover;
            object-position: center;
            border-radius: 0 6px 6px 0;
        }
    }
`

export const CardFooter = styled.article`
    display: flex;
    align-items: center;
    gap: 15px;

    & section{
        display: flex;
        align-items: center;
        gap: 4px;
    }

`

export const CardHeader = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: ${(props) => (props.top ? "1.5rem" : "0.75rem")};

    & h2{
        margin-bottom: 20px;
        font-size: ${(props) => (props.top ? "3rem" : "1.5rem")};
        width: 100%;
    }

`