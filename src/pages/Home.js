import { Button, Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Home = () => (
  <MainLayout>
    <Jumbotron className="bg-light">
      <Container>
        <Row>
          <Col md={6} className="my-auto">
            <h1><b>QR Меню</b></h1>
            <h5 className="mt-4 mb-4">
              Веб сайт для владельцев заведений общественного питания
            </h5>
            <br/>
            <Button href="/places" variant="standard" size="lg">
              Создать меню
            </Button>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </MainLayout>
);

export default Home;