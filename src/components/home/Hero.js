import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

function Hero () {
    return (
    <div className="px-4 py-5 my-5 text-center sec-level">
      <h1 className="display-5 fw-bold">
        EasyHammer 10th edition
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">A powerful Warhammer 40k 10th edition calculator. Simulate attacks, optimize your strategy, and dominate the battlefield!</p>
      </div>
    </div>
    );
}

export default Hero;