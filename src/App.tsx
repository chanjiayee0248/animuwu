import './App.css'
import AnimeHomePage from "@/components/AnimeHomePage/AnimeHomePage";
import {Routes, Route} from "react-router-dom";
import AnimeDetailsPage from "@/components/AnimeDetailsPage/AnimeDetailsPage.tsx";


function App() {

    return (
        <Routes>
            <Route path="/" element={<AnimeHomePage />} />
            <Route path="/anime/:id" element={<AnimeDetailsPage />} />
        </Routes>
    )
}


export default App
