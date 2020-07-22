import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
    let history = useHistory();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    function handleChange(event) {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/login`,
            options
        );
        const result = await response.json();

        localStorage.setItem('user', result.token);

        if (result.role === 'admin') {
            history.push('/adminPage');
        } else {
            history.push('/userPage');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email'
                    onChange={handleChange}
                    value={userData.email}
                />
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    onChange={handleChange}
                    value={userData.password}
                />
                <input type='submit' value='Login' />
            </form>
        </div>
    );
}

export default Login;
