import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/value';

const CheckSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [isStale, setIsStale] = useState(false);
    const [filterStatus, setFilterStatus] = useState(['all']);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [sortOrder, setSortOrder] = useState('ascending');


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
        axios.get(API_URL + 'doctor/2/appointment')
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

    }, [isStale]);

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

    function applyFilters() {
        return schedules
            .filter(schedule => {
                if (filterStatus.length === 0 || filterStatus.includes('all')) {
                    return true;
                }
                return filterStatus.includes(schedule.status);
            })
            .filter(schedule => {
                return schedule.patientEntity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       schedule.patientEntity.id.toString().includes(searchTerm);
            })
            .filter(schedule => {
                return filterDate ? formatDate(schedule.date) === filterDate : true;
            })
            .sort((a, b) => {
                let dateA = new Date(`${formatDate(a.date)}T${formatTime(a.startTime)}`);
                let dateB = new Date(`${formatDate(b.date)}T${formatTime(b.startTime)}`);
                return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
            });
    }    

    function handleFilterChange(status) {
        if (status === 'all') {
            setFilterStatus(['all']);
        } else {
            setFilterStatus(current =>
                current.includes(status)
                    ? current.filter(s => s !== status)
                    : [...current.filter(s => s !== 'all'), status]
            );
        }
    }

    function toggleSortOrder() {
        setSortOrder(prev => prev === 'ascending' ? 'descending' : 'ascending');
    } 

    const handleConfirm = (schedule) => {
        axios.post(API_URL + 'doctor/update/appointment/' + schedule.id + '/status', 'waiting')
            .then((response) => {
                console.log(response.data);
                setIsStale(prev => !prev);
            })
            .catch((error) => {
                console.error('Error updating data: ', error);
            });
    };

    const handleDeny = (schedule) => {
        const now = new Date().toISOString();

        axios.post(API_URL + 'doctor/update/appointment/' + schedule.id + '/status', 'denied')
            .then((response) => {
                console.log(response.data);
                setIsStale(prev => !prev);
            })
            .catch((error) => {
                console.error('Error updating data: ', error);
            });
    };

    const handleFinish = (schedule) => {
        axios.post(API_URL + 'doctor/update/appointment/' + schedule.id + '/status', 'finished')
            .then((response) => {
                console.log(response.data);
                setIsStale(prev => !prev);
            })
            .catch((error) => {
                console.error('Error updating data: ', error);
            });
    };

    function renderSchedules() {
        const filteredSchedules = applyFilters();
        return (
            <div className="d-flex" style={{ height: '100%' }}>
                <div className="filter-section p-3" style={{ flex: '0 1 300px', minWidth: '300px' }}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Filters</h5>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search by patient name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <input
                                type="date"
                                className="form-control mb-3"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                            {['all', 'pending', 'waiting', 'denied', 'finished'].map(status => (
                                <div key={status} className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`filter-${status}`}
                                        checked={filterStatus.includes(status)}
                                        onChange={() => handleFilterChange(status)}
                                    />
                                    <label className="form-check-label" htmlFor={`filter-${status}`}>
                                        {status === 'pending' ? 'Pending' : status === 'waiting' ? 'Waiting' : status === 'denied' ? 'Denied' : status === 'finished' ? 'Finished' : 'All'}
                                    </label>
                                </div>
                            ))}
                            <div className="form-group">
                                <label htmlFor="sortOrder" className="form-label">Sort Order</label>
                                <select
                                    className="form-control"
                                    id="sortOrder"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="schedule-list flex-grow-1 p-3" style={{ minWidth: '60%' }}>
                    <div className="row g-3">
                        {filteredSchedules.map((schedule, index) => {
                            const styles = getStatusStyles(schedule.status, schedule.countdown);
                            return (
                                <div className="col-md-6 col-lg-4 team-item" key={index}>
                                    <div className="card shadow-sm mb-3" style={{ borderColor: styles.borderColor, borderWidth: '3px' }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{schedule.patientEntity.name}</h5>
                                            <p className="text-muted">Patient ID: {schedule.patientEntity.id}</p>
                                            <p className="text-muted">Appointment ID: {schedule.id}</p>
                                            <p className="small mb-1">
                                                <strong>Appointment:</strong> {formatDate(schedule.date)} at {formatTime(schedule.startTime)}
                                            </p>
                                            <p className="small mb-2" style={{ color: styles.color }}>
                                                <strong>Status:</strong> {schedule.status}
                                            </p>
                                            <p className="small mb-2">
                                                <strong>Countdown:</strong> {schedule.countdown}
                                            </p>
                                            <div className="d-flex justify-content-between mb-1">
                                                {renderButtons(schedule)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    
    
    function renderButtons(schedule) {
        switch (schedule.status) {
            case 'pending':
                return (
                    <>
                        <button className="btn btn-success btn-sm" onClick={() => handleConfirm(schedule)}>Accept</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeny(schedule)}>Deny</button>
                    </>
                );
            case 'waiting':
                return (
                    <>
                        <Link className="btn btn-primary btn-sm" to='/meeting' state={schedule.patientEntity}><i className="fa fa-phone"></i> Call</Link>
                        <button className="btn btn-warning btn-sm" onClick={() => handleFinish(schedule)}><i className="fa fa-file-alt"></i> Summary</button>
                    </>
                );
            case 'denied':
                return <span className="text-muted">Denied at {schedule.endTime ? formatDate(schedule.date) + ' ' + formatTime(schedule.endTime) : schedule.deniedAt}</span>;
            case 'finished':
                return (
                    <>
                        <button className="btn btn-info btn-sm"><i className="fa fa-file-alt"></i> Record</button>
                        <button className="btn btn-warning btn-sm"><i className="fa fa-file-alt"></i> Summary</button>
                    </>
                );
            default:
                return null;
        }
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
