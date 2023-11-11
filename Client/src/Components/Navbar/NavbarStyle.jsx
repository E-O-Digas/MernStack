import styled from "styled-components"

export const Button = styled.button`
    background-color: #0bade3;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0.4rem 0.5rem;
    margin: 0rem 1rem;
    color: white;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    border-radius: 0.3rem;
    font-family: Roboto, arial;
    font-weight: 500;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    
    &:hover {
        background-color: #0a56af;    
    }
`

export const InputSpace = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1rem;
    width: 200px;
    position: relative;

    input{
        outline: none;
        font-size: 1rem;
        padding: 0.4rem;
        background-color: #f5f5f5;
        border: none;
        width: 100%;
        border-radius: 0.3rem;

        &:focus {
            border: 1px solid #0bade3;
        }   
    }

    i{
        position: absolute;
        top: 1;
        right: 0.2rem;
        z-index: 10;
        border: none;
        background-color: #f5f5f5;
        color: #757575;
        border-radius: 0.1rem;
        padding: 0.3rem;
    }
`


export const ImageLogo = styled.img`
    width: 6rem;
    height: 3.5rem;
    cursor: pointer;
`

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    background-color: white;
    width: 100%;
    top: 0;
    padding: 1rem 0;
    z-index: 1;
    box-shadow: rgba(17, 17, 126, 0.1) 0px 1px 0px 0px;
`