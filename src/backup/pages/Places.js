import { Row, Col, Modal } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from "react";
import styled from 'styled-components';

import { fetchPlaces } from '../apis';
import AuthContext from '../contexts/AuthContext';

import MainLayout from "../layouts/MainLayout";
import PlaceFrom from '../containers/PlaceForm';

const Place = styled.div`
margin-bottom: 20px;
cursor: pointer;
transition: all 0.2s;
:hover {
    transform scale(1.05);
}
> div {
    background-size: cover;
    height: 200px;
    border-radius: 5px;
}
> p {
    margin-top: 5px;
    font-size: 20px;
    font-weight: bold;
}
`

const AddPlaceButton = styled.div`
border: 1 px dashed gray;
height: 200px;
border-radius: 5px;
display: flex;
align-items: center;
justify-content: center;
font-size: 20 px;
cursor: pointer:
background-color: white;
:hover {
    background-color: #fbfbfb;
}
`;

const Places = () => {
    const [places, setPlaces] = useState([]);
    const [show, setShow] = useState(false);

    const auth = useContext(AuthContext);

    const  onHide = () => setShow(false);
    const  onShow = () => setShow(true);


    const onFetchPlaces = async () => {
        const json = await fetchPlaces(auth.token)
        if (json) {
            setPlaces(json);
        }
    };

    const onDone = () => {
        onFetchPlaces();
        onHide();
    }


    useEffect(() => {
        onFetchPlaces();
    }, []);
    
    return (
        <MainLayout>
            <h3>Заведения</h3>

    <Modal show={show} onHide={onHide} center>
    <Modal.Body>
        <PlaceFrom onDone={onDone} />
    </Modal.Body>
    </Modal>

            <Row>
                {places.map((place) => (
                    <Col key={place.id} lg={4}>
                        <Place>
                            <div style={{ backgroundImage: `url(${place.image})` }}></div>
                            <p>{place.name}</p>
                        </Place>
                    </Col>
                ))}

<Col lg={4}>
    <AddPlaceButton onClick={onShow}>
        Добавить заведение
    </AddPlaceButton>
</Col>

            </Row>
        </MainLayout>
    )
}

export default Places;