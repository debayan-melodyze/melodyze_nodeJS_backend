import { writeDataToDb } from '../db/writeDb.js';

async function storeMergedAudioVideo(req, res) {
    try {
        const recording_name = req.body.recording_name;
        const user_id = req.body.user_id;
        const recording_id = req.body.recording_id;
        const recording_version_id = req.body.recording_version_id;
        const annotated_song_id = req.body.annotated_song_id;
        const annotated_song_version_id = req.body.annotated_song_version_id;
        const final_video_path = req.body.final_video_path;
        const final_audio_path = req.body.final_audio_path;

        const currentTime = new Date();

        var created_on = currentTime.toLocaleString()
        var new_delete_status = "active"
        var new_master_annotated_song_id = annotated_song_id
        var new_master_annotated_song_version_id = annotated_song_version_id
        var new_master_recording_id = recording_id
        var new_master_recording_version_id = recording_version_id
        var new_master_user_id = user_id
        var new_video_file_location = final_video_path
        var new_audio_file_location = final_audio_path
        var new_recording_name = recording_name
        var new_id = new_master_recording_id+"_"+new_master_recording_version_id+"_"+new_master_annotated_song_id+"_"+new_master_annotated_song_version_id

        var data = {
            "delete_status": new_delete_status,
            "master_annotated_song_id": new_master_annotated_song_id,
            "master_annotated_song_version_id": new_master_annotated_song_version_id,
            "master_recording_id": new_master_recording_id,
            "master_recording_version_id": new_master_recording_version_id,
            "master_user_id": new_master_user_id,
            "final_video_file_location": new_video_file_location,
            "final_audio_file_location": new_audio_file_location,
            "recording_name": new_recording_name,
            "created_on": created_on
        }

        await writeDataToDb('/Merged_BGM_Vocal_Details/'+new_id, data);

        var response = {"status": "successful"}

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { storeMergedAudioVideo };