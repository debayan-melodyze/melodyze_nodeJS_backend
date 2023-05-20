import { writeDataToDb } from '../db/writeDb.js';
import { readDataFromDbSpecificQuery } from '../db/readDb.js';

async function storeNewRecordingEntry(req, res) {
    try {
        const vocal_path = req.body.vocal_path;
        const tempo = req.body.tempo;
        const scale = req.body.scale;
        const genre = req.body.genre;
        const song_id = req.body.song_id;
        const user_id = req.body.user_id;

        const currentTime = new Date();

        var new_master_genre = genre
        var new_master_scale = scale
        var new_master_tempo = tempo
        var new_master_user_id = user_id
        var new_master_vocal_filter_name = "no_filter"        
        var new_recording_created_on = currentTime.toLocaleString()
        var new_recording_id = await getNewRecordingID(user_id, song_id)
        var new_version_id = "v_raw"
        var new_recording_id_version_id = new_recording_id+"_"+new_version_id
        var new_recording_id_vocal_filter = new_recording_id+"_"+new_master_vocal_filter_name
        var new_recording_status = "active"
        var new_vocal_audio_file_location = vocal_path
        var new_id = new_recording_id_version_id

        var data = {
            "master_genre": new_master_genre,
            "master_scale": new_master_scale,
            "master_tempo": new_master_tempo,
            "master_user_id": new_master_user_id,
            "master_vocal_filter_name": new_master_vocal_filter_name,
            "recording_created_on": new_recording_created_on,
            "recording_id": new_recording_id,
            "version_id": new_version_id,
            "recording_id_version_id": new_recording_id_version_id,
            "recording_id_vocal_filter": new_recording_id_vocal_filter,
            "recording_status": new_recording_status,
            "vocal_audio_file_location": new_vocal_audio_file_location
        }

        await writeDataToDb('/User_Recorded_Song_Details/'+new_id, data);

        var response = {"recording_id": new_recording_id, "version_id": new_version_id, "new_vocal_path": new_vocal_audio_file_location}
        res.json(response);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNewRecordingID(user_id, song_id) {
    var dbData = await readDataFromDbSpecificQuery('/User_Recorded_Song_Details', "master_user_id", user_id);

    var max_recording_no_user_song = 0
    for (let key in dbData) {
        if (dbData.hasOwnProperty(key)) {
            const value = dbData[key];
            var recording_id = value["recording_id"];
            if(recording_id.startsWith(user_id+"_"+song_id)){
                const splRecID = recording_id.split("_");
                var recording_no = parseInt(splRecID[splRecID.length-1]);
                if(recording_no > max_recording_no_user_song) {
                    max_recording_no_user_song = recording_no;
                }                   
            }
        }
    }
    var new_recording_id = max_recording_no_user_song+1
    new_recording_id = user_id+"_"+song_id+"_rec_"+new_recording_id.toString()
    return new_recording_id
}

export { storeNewRecordingEntry };