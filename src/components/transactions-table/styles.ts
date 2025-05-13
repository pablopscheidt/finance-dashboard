import styled from "styled-components";

export const TableContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1rem;

    @media screen and (max-width: 1024px) {
        max-width: calc(100vw - 32px);
    }
`;