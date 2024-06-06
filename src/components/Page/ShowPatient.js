import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ShowPatient = () => {
    const [patients, setPatients] = useState([
        { id: 1, name: 'John Doe', status: 'Registered' },
        { id: 2, name: 'Jane Smith', status: 'Registered' }
    ]);
    const [requests, setRequests] = useState([
        { id: 3, name: 'Alice Johnson', message: 'I would like to register as a patient.' }
    ]);

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
            <Tabs>
                <TabList>
                    <Tab>Patient Requests</Tab>
                    <Tab>Registered Patients</Tab>
                </TabList>

                <TabPanel>
                    <div className="bg-light p-3 rounded">
                        <h4>Patient Requests</h4>
                        <ul className="list-group">
                            {requests.map(request => (
                                <li key={request.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {request.id} - {request.name} <span className="text-muted">({request.message})</span>
                                    <div>
                                        <button onClick={() => handleApprove(request.id)} className="btn btn-sm btn-success me-2">Approve</button>
                                        <button onClick={() => handleReject(request.id)} className="btn btn-sm btn-danger">Reject</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </TabPanel>
                
                <TabPanel>
                    <div className="bg-light p-3 rounded">
                        <h4>Registered Patients</h4>
                        <ul className="list-group">
                            {patients.map(patient => (
                                <li key={patient.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {patient.id} - {patient.name}
                                    <div>
                                        <Link to={`/chat/${patient.id}`} className="btn btn-sm btn-info me-2">Chat</Link>
                                        <Link to={`/info/${patient.id}`} className="btn btn-sm btn-secondary me-2">Info</Link>
                                        <button onClick={() => handleTerminate(patient.id)} className="btn btn-sm btn-danger">Terminate</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default ShowPatient;
