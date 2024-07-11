import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"
import "../../css/Footer.css"

import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';

import discordIcon from "../../img/discord.svg"
import githubIcon from "../../img/github.svg"

function Footer() {
    return(
        <Container fluid className='sec-level py-2'>
            <Row>
                <Col className="footer">
                        <span className="accent-text"><b>EasyHammer</b></span> — Powered by
                        <a href="https://wahapedia.ru/" target="_blank" rel="noopener noreferrer">
                            <span className="accent-text"> Wahapedia</span>
                        </a>
                </Col>
                <Col xs={{span: "auto"}}>
                    <ul >
                        <li class='footer-list list-unstyled'>
                            <img src = {discordIcon} alt="discord icon"/>
                            <span>Proce#3248</span>
                        </li>
                        <li class='footer-list list-unstyled'>
                            <a href="https://github.com/zarzas980" target="_blank" rel="noopener noreferrer">
                                <img src = {githubIcon} alt="github icon"/>
                                GitHub
                            </a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer

