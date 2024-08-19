import ModalHeartRate from '../modal/Modal';
import MeetingRoom from "../../meetingSDK/MeetingRoom";

function JoinMeeting() {
    return (
        <div className="meeting-element">
            <MeetingRoom role={1} />
            <ModalHeartRate />
        </div>
    );
}
export default JoinMeeting;