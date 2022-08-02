import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import MainPage from '../view/MainPage.js'

const ReactDomComponent = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default ReactDomComponent;