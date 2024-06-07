import React from 'react';
import { useParams } from 'react-router-dom';
import { samplePatients } from '../../constants/samplePatients.js';
import MeasurementHistory from './MeasurementHistory';
import MedicalHistory from './MedicalHistory';

const PatientInfo = () => {
    const { patientId } = useParams();
    const patient = samplePatients.find(p => p.id === parseInt(patientId));

    if (!patient) {
        return <div className="container mt-3">Patient not found!</div>;
    }

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="p-3 border rounded bg-light">
                        <h3>{patient.fullName} - Details</h3>
                        <p><strong>ID (CPR):</strong> {patient.cpr}</p>
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Gender:</strong> {patient.gender}</p>
                        <p><strong>Health ID:</strong> {patient.healthId}</p>
                        <p><strong>Weight:</strong> {patient.weight} kg</p>
                        <p><strong>Height:</strong> {patient.height} cm</p>
                        <p><strong>Existing Conditions:</strong> {patient.conditions || 'None'}</p>
                    </div>
                    <MeasurementHistory patientId={patientId} />
                    <MedicalHistory patientId={patientId} />
                </div>
            </div>
        </div>
    );
}

export default PatientInfo;