const samplePatients = [
    {
        id: 1,
        fullName: 'John Doe',
        age: 30,
        gender: 'Male',
        cpr: '123456789',
        healthId: 'HD123',
        weight: 70,
        height: 175,
        conditions: 'Diabetes',
        status: 'Registered'
    },
    {
        id: 2,
        fullName: 'Jane Smith',
        age: 25,
        gender: 'Female',
        cpr: '987654321',
        healthId: 'HD124',
        weight: 65,
        height: 160,
        conditions: '',
        status: 'Registered'
    }
];

const sampleRequests = [
    { id: 3, fullName: 'Alice Johnson', message: 'I would like to register as a patient.', age: 22, gender: 'Female', cpr: '123123123', healthId: 'HD125' }
];

export { samplePatients, sampleRequests };