import './header.scss';
import { Container,Row,Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import Loader from './Loader';

function Header(props) {
    let eur=props.rates ? 1/props.rates.EUR*1 : null
    let usd=props.rates ? 1/props.rates.USD*1 : null
    
{/* ============================================================================================             */}
  return (
    <header className="header">
        <Container>
            <Row className='header-row'>
                <Col>
                    <img className='header__logo' src='../assets/trident.png' alt=''/>
                </Col>
                <Col className='display'>
                    <img className='display__flag' src='../assets/EUR.png' alt=''/>
                    <span className='display__name'>EUR</span>
                    <span className='display__value'>{props.rates ? eur.toFixed(2) : <Loader/>}</span>
                </Col>
                <Col className='display'>
                    <img className='display__flag' src='../assets/USD.png' alt=''/>
                    <span className='display__name'>USD</span>
                    <span className='display__value'>{props.rates ? usd.toFixed(2) : <Loader/>}</span>
                </Col>
            </Row>
        </Container>
    </header>
  );
}
{/* ============================================================================================             */}

function mapStateToProps(state){
    return {
        rates:state.rates,
    }
 }

export default connect(mapStateToProps)(Header);