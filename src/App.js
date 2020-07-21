import React from "react";

import LoginUser from './Pages/Login/LoginUser'
import LoginAdmin from './Pages/Login/LoginAdmin'
import Register from './Pages/Register/Register'

function App() {
    return <div>
        <Register />
        <LoginUser />
        <LoginAdmin />
    </div>;
}

export default App;
