import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

import { ref, update } from "firebase/database";
import { database } from "../services/firebase/config";

import { ZOOM_SIGN_URL } from '../constants/value';


function MeetingRoom({ role = 0 }) {
    const [stateMeeting, setStateMeeting] = useState(false);

    const [stateConnect, setStateConnect] = useState(false);

    const navigate = useNavigate();

    var authEndpoint = ZOOM_SIGN_URL
    var sdkKey = 'LPqZQdOeTCWdA5fspfFWmg'
    var meetingNumber = "7602498268"
    var passWord = "452002"
    var userName = 'Doctor'
    var userEmail = ''
    var registrantToken = ''
    var zakToken = ''

    const location = useLocation()

    const { userID } = location.state;

    const dbRef = ref(database);

    var client;

    const handleConfirm = async () => {
        const updates = {
            [`videoCall/${userID}/isAccepted`]: true
        };

        const UpdateOutDatedResult = {
            [`result/${userID}/result/isOutDated`]: true
        }

        try {
            await update(dbRef, UpdateOutDatedResult)
            await update(dbRef, updates);
            console.log(`User with ID ${userID} has been confirmed.`);
        } catch (error) {
            console.error('Error updating user confirmation:', error);
        }
    }

    function getSignature(e) {
        e.preventDefault();

        fetch(authEndpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
             },
            body: JSON.stringify({
                meetingNumber: meetingNumber,
                role: role
            })
        }).then(res => res.json())
            .then(response => {
                setStateConnect(true);
                startMeeting(response.signature)
            }).catch(error => {
                console.error(error)
            })
    }

    function startMeeting(signature) {
        console.log('Signature:', signature)

        try {
            client = ZoomMtgEmbedded.destroyClient();
            client = ZoomMtgEmbedded.createClient();
        } catch (e) {
            client = ZoomMtgEmbedded.createClient();
        }

        let meetingSDKElement = document.getElementById('meetingSDKElement');

        client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true }).then(() => {
            client.join({
                signature: signature,
                sdkKey: sdkKey,
                meetingNumber: meetingNumber,
                password: passWord,
                userName: userName,
                userEmail: userEmail,
                tk: registrantToken,
                zak: zakToken
            }).then(async () => {
                setStateMeeting(true);

                await handleConfirm();

                console.log('joined successfully')
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleEndMeeting = async () => {
        client = ZoomMtgEmbedded.destroyClient();

        const updates = {
            [`videoCall/${userID}/isMeeting`]: false
        };

        console.log(updates)

        try {
            await update(dbRef, updates);

            console.log(`User with ID ${userID} has been confirmed.`);
        } catch (error) {
            console.error('Error updating user confirmation:', error);
        }

        navigate("/")
    }

    return (
        <div style={{ 'marginTop': '50px', 'width': '80%' }}>
            {/* For Component View */}
            <div id="meetingSDKElement" className='meetingSDKElement'>
                {/* Zoom Meeting SDK Component View Rendered Here */}
            </div>
            {stateMeeting ? <button className="btn btn-primary w-100 py-3" onClick={handleEndMeeting}>End meeting</button> : ""}
            <div>
                {stateConnect ? "" : <button className="btn btn-primary w-100 py-3" onClick={getSignature}>{stateConnect ? "Connecting ..." : "Join Meeting"}</button>}
            </div>
        </div>
    );
}
export default MeetingRoom;