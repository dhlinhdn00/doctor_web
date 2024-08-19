import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from "./ModalDoctor.module.css";
import showIcon from "../../img/red-heart.gif";
import axios from "axios";
import { API_URL } from "../../constants/value";
import { ref, child, onValue } from "firebase/database";
import { database } from "../../services/firebase/config";
import DataResult from "../Result/DataResult";

function ModalHeartRate() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [result, setResult ] = useState({});

    useEffect(() => {
        axios.get(API_URL + "user/get/result/" + 8)
            .then((response) => {

                const dbRef = ref(database);
                console.log(response.data);

                onValue((child(dbRef, `result/${response.data.uuid}/result`)), (snapshot) => {
                    const data = snapshot.val();
    
                    setResult(data);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [show]);

    return (
        <>
            <img className={style.icon} src={showIcon} onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Informations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DataResult data={{ result: result }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalHeartRate;


