import React from 'react';

const MeasurementHistory = ({ patientId }) => {
    // Assume measurements are fetched from a server or constants file
    const measurements = [{
        time: '2022-05-01 10:00',
        heartRate: 72,
        respiratoryRate: 16,
        spo2: 98,
        activityStatus: 'Resting',
        icon: 'ecg-icon.png'  // Placeholder for an actual image or icon
    }];

    return (
        <div className="p-3 border rounded bg-light mt-4">
            <h4>Measurement History</h4>
            {measurements.map((m, index) => (
                <div key={index} className="list-group-item">
                    <p><strong>Time:</strong> {m.time}</p>
                    <p><strong>Heart Rate:</strong> {m.heartRate} bpm</p>
                    <p><strong>Respiratory Rate:</strong> {m.respiratoryRate}</p>
                    <p><strong>SPO2:</strong> {m.spo2}%</p>
                    <p><strong>Status:</strong> {m.activityStatus}</p>
                    <img src={m.icon} alt="ECG icon" />
                </div>
            ))}
        </div>
    );
}

export default MeasurementHistory;