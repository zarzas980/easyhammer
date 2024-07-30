import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

import { Container } from "react-bootstrap";

function Disclaimer({children}) {
    return (
        <Container className="Disclaimer sec-level py-2 pb-3">
                <h2 className="text-danger">Warning! Read this first.</h2>
                <ul className="text-start">
                    <li>This is a prototype. Some functions are not supported, such as damage reduction, special abilities and others.</li>
                    <li>This calculator works by doing 100000 simulations of the attack secuence. This is a client-sided App, all calculations are done in your device. Be cautious when using it on small devices.</li>
                    <li>If you find any error or have some feedback, please contact me. Links at the bottom.</li>
                    <li>Some datasheets may have errors. There are a lot of them so it will take some time to fix everything. Again, if you find any problem please contact me.</li>
                </ul>
                {children}
        </Container>
    )
}

export default Disclaimer;