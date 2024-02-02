import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){
    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            <button className='button_to_go_back' onClick={() => navigate(-1)}>Go Back</button>
            <h1>VP</h1>
            <button className='button_to_home' onClick={() => navigate('/')}>Home</button>
        </nav>
    )
}