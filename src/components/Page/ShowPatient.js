import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { samplePatients, sampleRequests } from '../../constants/samplePatients.js';

const ShowPatient = () => {
    const [patients, setPatients] = useState(samplePatients);
    const [requests, setRequests] = useState(sampleRequests);

    const [showRequests, setShowRequests] = useState(true);
    const [showPatients, setShowPatients] = useState(true);

    const handleApprove = (id) => {
        const request = requests.find(req => req.id === id);
        setPatients([...patients, { ...request, status: 'Registered' }]);
        setRequests(requests.filter(req => req.id !== id));
    };

    const handleReject = (id) => {
        setRequests(requests.filter(req => req.id !== id));
    };

    const handleTerminate = (id) => {
        setPatients(patients.filter(patient => patient.id !== id));
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="p-3 border rounded bg-light">
                        <h4 onClick={() => setShowRequests(!showRequests)} style={{ cursor: 'pointer' }}>
                            Patient Requests {showRequests ? <i className="bi bi-chevron-down"></i> : <i className="bi bi-chevron-up"></i>}
                        </h4>
                        {showRequests && (
                            <ul className="list-group">
                                {requests.map(request => (
                                    <li key={request.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {request.id} - {request.fullName} <span className="text-muted">{"\"" + request.message + "\""}</span>
                                        <div>
                                            <button onClick={() => handleApprove(request.id)} className="btn btn-sm btn-success me-2">Approve</button>
                                            <button onClick={() => handleReject(request.id)} className="btn btn-sm btn-danger">Reject</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="p-3 border rounded bg-light mt-4">
                        <h4 onClick={() => setShowPatients(!showPatients)} style={{ cursor: 'pointer' }}>
                            Registered Patients {showPatients ? <i className="bi bi-chevron-down"></i> : <i className="bi bi-chevron-up"></i>}
                        </h4>
                        {showPatients && (
                            <ul className="list-group">
                                {patients.map(patient => (
                                    <li key={patient.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {patient.id} - {patient.fullName}
                                        <div>
                                            <Link to={`/chat/${patient.id}`} className="btn btn-sm btn-info">Chat</Link>
                                            <Link to={`/info/${patient.id}`} className="btn btn-sm btn-secondary me-2">Info</Link>
                                            <button onClick={() => handleTerminate(patient.id)} className="btn btn-sm btn-danger">Terminate</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowPatient;
