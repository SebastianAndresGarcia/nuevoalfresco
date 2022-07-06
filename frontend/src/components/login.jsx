import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import '../styles/login.scss'

export function Login() {

    return (
        
            <section className="section-container">
                <div className="row">
                    <Col sm={8} className="left">
                         <img src={require(`../assets/images/logo.jpeg`)} style= {{width:"90%"}} alt='imagen'/>
                    </Col>
                    <Col sm={4} className="right">
                        <h3>INICIAR SESION</h3>

                        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

                    </Col>
                </div>
            </section>
        
    )
}