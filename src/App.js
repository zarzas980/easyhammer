import './css/App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Home from "./components/home/Home"
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import { Container } from 'react-bootstrap';



function App() {
  return (
    <div className="App" >
      <header className="App-header">
          <Navbar/>
      </header>
      <main>
        <Container fluid >
          <Home/>
        </Container>
      </main>
      <footer>
          <Footer/>
      </footer>
    </div>
  );
}

export default App;
