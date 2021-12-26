import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IsAuthenticated } from './Services/Auth';

import Home from './Pages/Home'
import Error404 from './Pages/Error/404'
import SavedJobs from './Pages/SavedJobs'

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vagas-salvas" element={<IsAuthenticated><SavedJobs /></IsAuthenticated>} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    </BrowserRouter>
)

export default Router
