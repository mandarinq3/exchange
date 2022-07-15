import './main.scss';
import { Container,Row,Col,Form,Button } from 'react-bootstrap';


function Main() {
  return (
    <main className="main">
        <Container>
            <Row className='main-row'>
                <h2 className='main-row__title--buy'>buy</h2>
                <Form>
                    <fieldset className='amount-fieldset '>
                        <Form.Group>
                            <Form.Label htmlFor="currencyInp" className='currency-label'>
                            <img className='main-currency-flag' src='../assets/ukraine.png' alt=''/>
                                <Form.Select id="currencyInp">
                                     <option className='currency-uah'>UAH</option>
                                     <option className='currency-usd'>USD</option>
                                     <option className='currency-eur'>EUR</option>
                                </Form.Select>
                             </Form.Label>
                        </Form.Group>
                    
                        <Form.Group >
                            <Form.Label htmlFor="amountInp" className='amount-label'>
                                <Form.Control id='amountInp' placeholder="uah" />
                            </Form.Label>
                        </Form.Group>

                        
                    </fieldset>
                </Form>
            </Row>

            {/* =============================================================== */}
            <Row className='main-row'>
            <h2 className='main-row__title--sell'>sell</h2>
            <Form>
                    <fieldset className='amount-fieldset '>
                        <Form.Group>
                            <Form.Label htmlFor="currencyInp" className='currency-label'>
                            <img className='main-currency-flag' src='../assets/ukraine.png' alt=''/>
                                <Form.Select id="currencyInp">
                                     <option className='currency-uah'>UAH</option>
                                     <option className='currency-usd'>USD</option>
                                     <option className='currency-eur'>EUR</option>
                                </Form.Select>
                             </Form.Label>
                        </Form.Group>
                    
                        <Form.Group >
                            <Form.Label htmlFor="amountInp" className='amount-label'>
                                <Form.Control id='amountInp' placeholder="uah" />
                            </Form.Label>
                        </Form.Group>

                        
                    </fieldset>
                </Form>
            </Row>
        </Container>
    </main>
  );
}

export default Main;