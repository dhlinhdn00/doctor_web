import React from 'react';

const MedicalHistory = ({ patientId }) => {
    // Placeholder data
    const medicalRecords = [{
        date: '2022-04-20',
        description: 'Annual check-up',
        outcome: 'All clear'
    }];

    return (
        <div className="p-3 border rounded bg-light mt-4">
            <h4>Medical History</h4>
            {medicalRecords.map((record, index) => (
                <div key={index} className="list-group-item">
                    <p><strong>Date:</strong> {record.date}</p>
                    <p><strong>Description:</strong> {record.description}</p>
                    <p><strong>Outcome:</strong> {record.outcome}</p>
                </div>
            ))}
        </div>
    );
}

export default MedicalHistory;