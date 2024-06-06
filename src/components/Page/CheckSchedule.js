import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import sampleData from '../../constants/sampleData.js';

const CheckSchedule = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        setSchedules(sampleData.map(schedule => ({
            ...schedule,
            countdown: calculateCountdown(schedule.date, schedule.time, schedule.status)
        })));
    
        const interval = setInterval(() => {
            setSchedules(currentSchedules => currentSchedules.map(schedule => ({
                ...schedule,
                countdown: calculateCountdown(schedule.date, schedule.time, schedule.status)
            })));
        }, 1000);  
    
        return () => clearInterval(interval);
    }, []);

    const getStatusStyles = (status, countdown) => {
        // Parse countdown to get hours left
        let hoursLeft = 72; // Default high value for cases with undefined or incorrect countdown formats
        const match = countdown.match(/(\d+)h/); // Extract hours from the countdown string
        if (match) {
            hoursLeft = parseInt(match[1], 10);
        }
    
        switch (status) {
            case 'denied':
                return { borderColor: '#808080', color: '#808080' }; // Grey for denied
            case 'waiting':
                return { borderColor: '#008000', color: '#008000' }; // Green for waiting
            case 'finished':
                return { borderColor: '#000080', color: '#000080' }; // Dark blue for finished
            case 'pending':
                // Transition from orange to red as time decreases
                const hue = hoursLeft <= 24 ? 0 : (hoursLeft <= 48 ? 30 : 60);
                return { borderColor: `hsl(${hue}, 100%, 50%)`, color: `hsl(${hue}, 100%, 40%)` };
            default:
                return { borderColor: 'initial', color: 'initial' };
        }
    };
    
    
    const calculateCountdown = (date, time, status) => {
        if (status !== 'pending' && status !== 'waiting') {
            return "—"; // No countdown if not pending or waiting
        }
    
        const now = new Date();
        const appointmentTime = new Date(`${date}T${time}`);
        const difference = appointmentTime - now;
    
        if (difference < 0) {
            return "0s"; // Appointment time has passed
        }
    
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
        return `${hours}h ${minutes}m ${seconds}s`;
    };    

    const handleConfirm = (schedule) => {
        const now = new Date().toISOString();
        const updatedSchedules = schedules.map(sch => {
            if (sch.id === schedule.id) {
                return { ...sch, status: 'waiting', confirmedAt: now };
            } else if (sch.time === schedule.time && sch.status === 'pending') {
                return { ...sch, status: 'denied', deniedAt: now };
            }
            return sch;
        });
        setSchedules(updatedSchedules);
    };

    const handleDeny = (schedule) => {
        const now = new Date().toISOString();
        const updatedSchedules = schedules.map(sch =>
            sch.id === schedule.id ? { ...sch, status: 'denied', deniedAt: now } : sch
        );
        setSchedules(updatedSchedules);
    };

    function renderSchedules() {
        return schedules.map((schedule, index) => {
            const styles = getStatusStyles(schedule.status, schedule.countdown);
            return (
                <div className="col-md-6 col-lg-4 team-item" key={index}>
                    <div className="card shadow-sm mb-3" style={{ borderColor: styles.borderColor, borderWidth: '3px' }}>
                        <img className="card-img-top" src={schedule.photoURL} style={{ height: '400px', objectFit: 'cover' }} alt='' />
                        <div className="card-body">
                            <h5 className="card-title">{schedule.username}</h5>
                            <p className="text-muted">Patient ID: {schedule.userID}</p>
                            <p className="text-muted">Appointment ID: {schedule.appointmentID}</p>
                            <p className="small mb-1">
                                <strong>Appointment:</strong> {schedule.date} at {schedule.time}
                            </p>
                            <p className="small mb-2" style={{ color: styles.color }}>
                                <strong>Status:</strong> {schedule.status}
                            </p>
                            <p className="small mb-2">
                                <strong>Countdown:</strong> {schedule.countdown}
                            </p>
                            <div className="d-flex justify-content-between mb-1">
                                {schedule.status === 'pending' && (
                                    <>
                                        <button className="btn btn-success btn-sm" style={{ padding: '6px 40px' }} onClick={() => handleConfirm(schedule)}>
                                            Accept
                                        </button>
                                        <button className="btn btn-danger btn-sm" style={{ padding: '6px 40px' }} onClick={() => handleDeny(schedule)}>
                                            Deny
                                        </button>
                                    </>
                                )}
                                {schedule.status === 'waiting' && (
                                    <>
                                        <button className="btn btn-primary btn-sm" style={{ padding: '6px 40px' }}>
                                            <i className="fa fa-phone"></i> Call
                                        </button>
                                        <button className="btn btn-warning btn-sm" style={{ padding: '6px 40px' }}>
                                            <i className="fa fa-file-alt"></i> Summary
                                        </button>
                                    </>
                                )}
                                {schedule.status === 'denied' && (
                                    <span className="text-muted" style={{ fontSize: '16px' }}>
                                        Denied at {schedule.deniedAt}
                                    </span>
                                )}
                                <Link to={`/chat/${schedule.userID}`} className="btn btn-info btn-sm" style={{ padding: '6px 12px' }}>
                                    <i className="fa fa-comments"></i>
                                </Link>
                                <Link to={`/patient/${schedule.userID}`} className="btn btn-secondary btn-sm" style={{ padding: '6px 12px' }}>
                                    <i className="fa fa-info"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="container-fluid pt-3">
            <div className="container">
                <div className="row g-3">
                    {renderSchedules()}
                </div>
            </div>
        </div>
    );
}

export default CheckSchedule;
