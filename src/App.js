import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import './styles/App.css'

function App() {
    return (
        <>
            <Header/>
            <Main count={30}/>
            <Footer/>
        </>
    )
}

export default App;