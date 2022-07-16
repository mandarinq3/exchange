import './header.scss';
import { Container,Row,Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import Loader from './Loader';

function Header(props) {
    console.log(props.rates)
// {EUR: 0.033539, USD: 0.033831, UAH: 1}
// EUR: 0.033539
// UAH: 1
// USD: 0.033831
// [[Prototype]]: Object
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
                    <span className='display__value'>{props.rates ? props.rates.EUR : <Loader/>}</span>
                </Col>
                <Col className='display'>
                    <img className='display__flag' src='../assets/USD.png' alt=''/>
                    <span className='display__name'>USD</span>
                    <span className='display__value'>{props.rates ? props.rates.USD : <Loader/>}</span>
                </Col>
            </Row>
        </Container>
    </header>
  );
}
function mapStateToProps(state){
    return {
        rates:state.rates,
    }
 }

export default connect(mapStateToProps)(Header);