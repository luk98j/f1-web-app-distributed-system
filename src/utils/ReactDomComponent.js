import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import MainPage from '../view/MainPage.js'
import PageWithData from "../view/PageWithData.js";

const ReactDomComponent = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/key/:keyId" element={<PageWithData/>}/>
                
            </Routes>
        </BrowserRouter>
    )

}

export default ReactDomComponent;