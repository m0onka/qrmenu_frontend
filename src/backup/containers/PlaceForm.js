import { Form, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";

import { addPlace } from "../apis";
import AuthContext from "../contexts/AuthContext";

import ImageDropZone from "./ImageDropzone";

const PlaceFrom = ({ onDone }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const auth = useContext(AuthContext);

    const onClick = async () => {
        const json = await addPlace({ name, image }, auth.token);
        if (json) {
            setName("");
            setImage("");
            onDone();
        }
    }
    return (
        <div>
            <h4 className="text-center">
                Заведение
            </h4>
            <Form.Group>
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Введите название" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    />                            
                                </Form.Group>
    
                                <Form.Group>
                                <Form.Label>Изображение</Form.Label>
                                    <ImageDropZone value={image} onChange={setImage} />
                                </Form.Group>
    
                                <Button variant="standard" block onClick={onClick}>
                                    Добавить
                                </Button>
    
        </div>
    )
}



export default PlaceFrom;