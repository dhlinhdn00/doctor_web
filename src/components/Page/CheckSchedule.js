import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/value';
const CheckSchedule = () => {
    const [schedules, setSchedules] = useState([]);

    function formatDate(dateString) {
        const [day, month, year] = dateString.split('/');
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return formattedDate;
    }

    function formatTime(timeString) {
        const [hour, minute] = timeString.split(':');
        const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        return formattedTime;
    }

    useEffect(() => {
        axios.get(API_URL + 'doctor/1/appointment')
            .then((response) => {
                console.log(response.data);
                setSchedules(response.data.map(schedule => ({
                    ...schedule,
                    countdown: calculateCountdown(formatDate(schedule.date), formatTime(schedule.startTime), schedule.status)
                })));
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });

        const interval = setInterval(() => {
            setSchedules(currentSchedules => currentSchedules.map(schedule => ({
                ...schedule,
                countdown: calculateCountdown(formatDate(schedule.date), formatTime(schedule.startTime), schedule.status)
            })));
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    const getStatusStyles = (status, countdown) => {
        let hoursLeft = 72;
        const match = countdown.match(/(\d+)h/);
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
            } else if (sch.startTime === schedule.startTime && sch.status === 'pending') {
                return { ...sch, status: 'denied', deniedAt: now };
            }
            return sch;
        });
        setSchedules(updatedSchedules);

        axios.post(API_URL + 'doctor/update/appointment/' + schedule.id + '/status', 'waiting')
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error updating data: ', error);
            });
    };

    const handleDeny = (schedule) => {
        const now = new Date().toISOString();
        const updatedSchedules = schedules.map(sch =>
            sch.id === schedule.id ? { ...sch, status: 'denied', deniedAt: now } : sch
        );
        setSchedules(updatedSchedules);

        axios.post(API_URL + 'doctor/update/appointment/' + schedule.id + '/status', 'denied')
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error updating data: ', error);
            });
    };

    function renderSchedules() {
        return schedules.map((schedule, index) => {
            const styles = getStatusStyles(schedule.status, schedule.countdown);
            return (
                <div className="col-md-6 col-lg-4 team-item" key={index}>
                    <div className="card shadow-sm mb-3" style={{ borderColor: styles.borderColor, borderWidth: '3px' }}>
                        {/* <img className="card-img-top" src={schedule.photoURL} style={{ height: '400px', objectFit: 'cover' }} alt='' /> */}
                        <div className="card-body">
                            <h5 className="card-title">{schedule.patientEntity.name}</h5>
                            <p className="text-muted">Patient ID: {schedule.patientEntity.id}</p>
                            <p className="text-muted">Appointment ID: {schedule.id}</p>
                            <p className="small mb-1">
                                <strong>Appointment:</strong> {formatDate(schedule.date)} at {schedule.startTime}
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
                                        Denied at {schedule.endTime ? schedule.date + ' ' + schedule.endTime : schedule.deniedAt}
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
