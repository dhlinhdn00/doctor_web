import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Chat.css';
import { samplePatients } from '../../constants/samplePatients.js';
import { sampleMessages } from '../../constants/sampleMessages.js';

const Chat = () => {
  const { id } = useParams();
  const [patients, setPatients] = useState(samplePatients);
  const [filteredPatients, setFilteredPatients] = useState(samplePatients);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (id) {
      const foundPatient = patients.find(p => p.id.toString() === id);
      setCurrentPatient(foundPatient);
      setMessages(sampleMessages[id] || []);
    } else {
      setCurrentPatient(null);
      setMessages([]); // Clear previous messages
    }
  }, [id, patients]);

  useEffect(() => {
    setFilteredPatients(
      patients.filter(patient =>
        patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        patient.id.toString().includes(searchTerm)
      )
    );
  }, [searchTerm, patients]);

  const handleSendMessage = () => {
    if (newMessage.trim() && currentPatient) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'Doctor',
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container d-flex" style={{ height: '80vh' }}>
      <div className="patient-list border-right px-2" style={{ width: '250px', overflowY: 'auto' }}>
        <input 
          type="text" 
          placeholder="Search by name or ID..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-2"
        />
        {filteredPatients.map((patient) => (
          <Link key={patient.id} to={`/chat/${patient.id}`} 
            className={`d-block p-2 border-bottom ${currentPatient && currentPatient.id === patient.id ? 'active-patient' : ''}`}>
            {patient.fullName}
          </Link>
        ))}
      </div>
      <div className="chat-area flex-grow-1 p-3 d-flex flex-column">
        <h2 className="chat-header">{currentPatient ? `Chat with ${currentPatient.fullName}` : "Welcome to BonneSante Chat"}</h2>
        <div className="messages-list flex-grow-1 mb-3 d-flex flex-column" style={{ overflowY: 'auto' }}>
          {!currentPatient ? (
            <div className="welcome-message d-flex flex-column justify-content-center align-items-center text-center">
              <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>Explore Our Services</h3>
              <p style={{ fontSize: '18px' }}>Connect with your patients, manage appointments, and more!</p>
              <img src="/logo512.png" alt="Welcome to BonneSanté" style={{ maxWidth: '100%', margin: '20px 0' }} />
              <p style={{ fontSize: '18px' }}>Start a conversation from the list or browse through our services to learn more.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender === 'Doctor' ? 'sent' : 'received'}`}>
                <p>{msg.text}</p>
                <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
        {currentPatient && (
          <div className="message-input d-flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="form-control me-2"
            />
            <button onClick={handleSendMessage} className="btn btn-primary">Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
