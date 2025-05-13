import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100vh;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`;
export const Left = styled.div`
    position: relative;
    width: 50vw;

    @media screen and (max-width: 1024px) {
        width: 100%;
        height: 30vh;

        img {
            overflow: visible;
        }
    }
`;
export const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1024px) {
        width: 100%;
        height: 70vh;
    }
`;

export const FormWrapper = styled.form`
    width: 60%;
    display: grid;
    gap: 1rem;

    @media screen and (max-width: 1024px) {
        width: 90%;
    }
`;

export const Title = styled.h1`
    margin: 0;
    font-size: 2rem;
    text-align: center;
    color: #333;
`;

export const Subtitle = styled.h2`
    margin: 0;
    font-size: 1rem;
    text-align: center;
    font-weight: 400;
    color: #888;
`;

export const Text = styled.p`
    font-size: 0.9rem;
    text-align: center;
    color: #555;
    margin: 0;
    margin-top: 0.5rem;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.25rem;
`;

export const Input = styled.input`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;

    &:focus {
        outline: none;
        border-color: #9158d9;
        box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
    }

    &::placeholder {
        color: #aaa;
    }

    &[data-error='true'] {
        border-color: #ff0040;
        box-shadow: 0 0 0 2px rgba(255, 0, 64, 0.2);

        &::placeholder {
            color:rgb(255, 2, 65);
        }
    }
`;

export const ErrorMessage = styled.p`
    font-size: 0.85rem;
    color: #ff0040;
`;

export const SubmitButton = styled.button`
    margin-top: 0.5rem;
    padding: 0.75rem;
    font-size: 1rem;
    background: #9158d9;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease;
    &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    }
    &:not(:disabled):hover {
    background: #703eba;
    }
`;
