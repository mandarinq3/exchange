import './header.scss';
import { Container,Row,Col } from 'react-bootstrap';

function Header() {
  return (
    <header className="header">
        <Container>
            <Row className='header-row'>
                <Col>
                    <img className='header__logo' src='../assets/trident.png' alt=''/>
                </Col>
                <Col className='display'>
                    <img className='display__flag' src='../assets/european-union.png' alt=''/>
                    <span className='display__name'>EUR</span>
                    <span className='display__value'>32,85</span>
                </Col>
                <Col className='display'>
                    <img className='display__flag' src='../assets/united-states.png' alt=''/>
                    <span className='display__name'>USD</span>
                    <span className='display__value'>36,70</span>
                </Col>
            </Row>
        </Container>
    </header>
  );
}

export default Header;