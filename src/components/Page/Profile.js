import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const [profile, setProfile] = useState({
        fullName: '',
        nationalId: '',
        phoneNumber: '',
        email: '',
        specialization: '',
        workplace: '',
        profileImage: './img/doctor_profile.jpg',
        licenseFile: null
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!profile.fullName) {
            formIsValid = false;
            errors["fullName"] = "Full name cannot be empty.";
        }

        if (!profile.nationalId || profile.nationalId.length === 10 ) {
            formIsValid = false;
            errors["nationalId"] = "National ID must be 10 characters.";
        }

        // if (!profile.phoneNumber || profile.nationalId.length !== 10) {
        //     formIsValid = false;
        //     errors["phoneNumber"] = "Phone number must be 10 characters long.";
        // }

        if (!profile.email) {
            formIsValid = false;
            errors["email"] = "Email cannot be empty.";
        } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
            formIsValid = false;
            errors["email"] = "Email address is invalid.";
        }

        if (!profile.specialization) {
            formIsValid = false;
            errors["specialization"] = "Specialization cannot be empty.";
        }

        if (!profile.workplace) {
            formIsValid = false;
            errors["workplace"] = "Workplace cannot be empty.";
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfile(prevProfile => ({
                ...prevProfile,
                profileImage: imageUrl
            }));
        }
    };

    const handleLicenseChange = (event) => {
        const file = event.target.files[0];
        setProfile(prevProfile => ({
            ...prevProfile,
            licenseFile: file
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Profile Submitted:', profile);
            // Implement an API call or other actions to submit the profile data
        }
    };

    return (
        <div className="container rounded bg-white mt-4 mb-4">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px"
                             src={profile.profileImage} 
                             alt="Profile" />
                        <button className="btn btn-primary profile-button"
                                onClick={() => document.getElementById('image-input').click()}>
                            Edit Image
                        </button>
                        <input type="file" className="d-none" id="image-input"
                               onChange={handleImageChange} />
                    </div>
                </div>
                <div className="col-md-9">
                    <form onSubmit={handleSubmit} className="p-3 py-5">
                    <div className="row mt-2">
                        <div className="col-md-10">
                            <label className="labels">Fullname</label>
                            <input type="text" className="form-control" placeholder="FullName" value={profile.fullName} onChange={handleChange} name="fullName" />
                            {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                        </div>
                        <div className="col-md-10">
                            <label className="labels">National ID</label>
                            <input type="text" className="form-control" placeholder="National ID" value={profile.nationalId} onChange={handleChange} name="nationalId" />
                            {errors.nationalId && <div className="text-danger">{errors.nationalId}</div>}
                        </div>
                        <div className="col-md-10">
                            <label className="labels">Phone Number</label>
                            <input type="text" className="form-control" placeholder="Phone number" value={profile.phoneNumber} onChange={handleChange} name="phoneNumber" />
                            {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                        </div>
                        <div className="col-md-10">
                            <label className="labels">Email</label>
                            <input type="email" className="form-control" placeholder="Email" value={profile.email} onChange={handleChange} name="email" />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="col-md-10">
                            <label className="labels">Specialization</label>
                            <input type="text" className="form-control" placeholder="Specialization" value={profile.specialization} onChange={handleChange} name="specialization" />
                        </div>
                        <div className="col-md-10">
                            <label className="labels">Workplace</label>
                            <input type="text" className="form-control" placeholder="Workplace" value={profile.workplace} onChange={handleChange} name="workplace" />
                        </div>
                        <div className="col-md-10">
                            <label className="labels">Medical License</label>
                            <input type="file" className="form-control-file" id="license-file"
                                   onChange={handleLicenseChange} />
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                        </div>
                    </div>
                    </form>
                    </div>

                    </div>    
            
        </div>
    );
};

export default Profile;
