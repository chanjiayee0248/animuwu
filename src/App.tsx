import './App.css'
import AnimeHomePage from "@/components/AnimeHomePage/AnimeHomePage";
import {Routes, Route} from "react-router-dom";
import AnimeDetailsPage from "@/components/AnimeDetailsPage/AnimeDetailsPage.tsx";
import {NotFoundPage} from "@/components/NotFoundPage/NotFoundPage.tsx";


function App() {

    return (
        <Routes>
            <Route path="/" element={<AnimeHomePage />} />
            <Route path="/anime/:id" element={<AnimeDetailsPage />} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    )
}


export default App
