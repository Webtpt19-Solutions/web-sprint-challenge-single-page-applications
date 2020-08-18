import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
    const history = useHistory()

    return(
        <Intro>
            <h2>Click the button below to order a pizza</h2>
            <button
                onClick={() => {
                    history.push('/order_form')
                }}
            >
                Start Ordering!
            </button>
        </Intro>
    )
};

export default Home;

const Intro = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    button {
        width: 25%;
        margin: 0 auto;
    }
`;