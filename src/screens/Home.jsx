import React, { useEffect } from 'react';
import { StylesHome } from '../styles/HomeStyles';
import { Header } from '../components/NavBar';


export const Home = () => {
    return (
        <div style={StylesHome.container}>
            <Header/>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>

                    </div>
                </div>
            </div>
        </div>
    )
}