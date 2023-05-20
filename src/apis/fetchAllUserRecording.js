import { readDataFromDbSpecificQuery } from '../db/readDb.js';

async function fetchRecordingsBasedOnUserID(req, res) {
    try {
        const user_id = req.body.user_id;

        var dbData = await readDataFromDbSpecificQuery('/Merged_BGM_Vocal_Details', "master_user_id", user_id);
    
            var response = {};

            var recording_list = []

            for (let key in dbData) {
                if (dbData.hasOwnProperty(key)) {
                    const value = dbData[key];
                    
                    var delete_status = value["delete_status"]
                    var master_annotated_song_id = value["master_annotated_song_id"]
                    var master_annotated_song_version_id = value["master_annotated_song_version_id"]
                    var master_recording_id = value["master_recording_id"]
                    var master_recording_version_id = value["master_recording_version_id"]
                    var merged_audio_file_location = value["final_audio_file_location"]
                    var merged_video_file_location = value["final_video_file_location"]
                    var recording_name = value["recording_name"]
                    var recording_time = value["created_on"]

                    if(delete_status !== "active") {
                        continue;
                    }

                    var dbDataBGM = await readDataFromDbSpecificQuery('/Annotated_Song', "annotated_song_id_version_id", 
                    master_annotated_song_id + "_" + master_annotated_song_version_id);

                    dbDataBGM = Object.values(dbDataBGM)[0]

                    var master_scale = dbDataBGM["master_scale"]
                    var master_genre = dbDataBGM["master_genre"]
                    var master_tempo = dbDataBGM["master_tempo"]

                    var dbDataVoc = await readDataFromDbSpecificQuery('/User_Recorded_Song_Details', "recording_id_version_id", 
                    master_recording_id + "_" + master_recording_version_id);

                    dbDataVoc = Object.values(dbDataVoc)[0]

                    var master_vocal_filter_name = dbDataVoc["master_vocal_filter_name"]                    

                    var data = {}
                    data["av_file_path"] = merged_video_file_location,
                    data["audio_file_path"] = merged_audio_file_location,
                    data["recording_name"] = recording_name,
                    data["scale"] = master_scale,
                    data["tempo"] = master_tempo,
                    data["bgm_filter"] = master_genre,
                    data["vocal_filter"] = master_vocal_filter_name
                    data["created_on"] = recording_time

                    

                    recording_list.push(data);
                }
            }
        response["data"] = recording_list;
    
        res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export { fetchRecordingsBasedOnUserID };