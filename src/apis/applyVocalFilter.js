import { writeDataToDb } from '../db/writeDb.js';
import { readDataFromDbSpecificQuery } from '../db/readDb.js';

async function storeFilterAppliedRecordingEntry(req, res) {
    try {
        const vocal_filter_name = req.body.vocal_filter_name;
        const recording_id = req.body.recording_id;

        const currentTime = new Date();

        var vocal_audio_file_location, new_recording_id, new_version_id;

        var existing_recording_vocal_filter_list = await readDataFromDbSpecificQuery('/User_Recorded_Song_Details', "recording_id_vocal_filter", 
        recording_id+"_"+vocal_filter_name);
        
        if(Object.keys(existing_recording_vocal_filter_list).length > 0) {
            existing_recording_vocal_filter_list = Object.values(existing_recording_vocal_filter_list)[0];
            vocal_audio_file_location = existing_recording_vocal_filter_list["vocal_audio_file_location"]
            new_recording_id = existing_recording_vocal_filter_list["recording_id"]
            new_version_id = existing_recording_vocal_filter_list["version_id"]
        }
        else {
            var existing_raw_recording_list = await readDataFromDbSpecificQuery('/User_Recorded_Song_Details', "recording_id_version_id", 
            recording_id+"_"+"v_raw");
            if(Object.keys(existing_raw_recording_list).length > 0) {
                var existing_raw_recording_val = Object.values(existing_raw_recording_list)[0];

                var new_master_genre = existing_raw_recording_val["master_genre"]
                var new_master_scale = existing_raw_recording_val["master_scale"]
                var new_master_tempo = existing_raw_recording_val["master_tempo"]
                var new_master_user_id = existing_raw_recording_val["master_user_id"]
                var new_master_vocal_filter_name = vocal_filter_name
                var new_recording_created_on = currentTime.toLocaleString()
                var new_recording_id = existing_raw_recording_val["recording_id"]
                var new_version_id = await get_new_version_id(recording_id)
                var new_recording_id_version_id = new_recording_id + "_" + new_version_id
                var new_recording_id_vocal_filter = new_recording_id + "_" + vocal_filter_name
                var new_recording_status = "active"
                var new_video_file_location = existing_raw_recording_val["video_file_location"]
                var new_vocal_audio_file_location = existing_raw_recording_val["vocal_audio_file_location"] // To be changed in actual API
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
                    "video_file_location": new_video_file_location,
                    "vocal_audio_file_location": new_vocal_audio_file_location
                }

                await writeDataToDb('/User_Recorded_Song_Details/'+new_id, data);

                vocal_audio_file_location = new_vocal_audio_file_location;
                new_recording_id = new_recording_id;
                new_version_id = new_version_id;


            }
            else {
                vocal_audio_file_location = "";
                new_recording_id = "";
                new_version_id = "";
            }
            
        }


        var response = {"vocal_path": vocal_audio_file_location, "recording_id": new_recording_id, "version_id": new_version_id}
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function get_new_version_id(recording_id) {
    var self_id_recording_list =  await readDataFromDbSpecificQuery('/User_Recorded_Song_Details', "recording_id", recording_id);

    var max_version_no = 0

    for (let key in self_id_recording_list) {
        if (self_id_recording_list.hasOwnProperty(key)) {
            const self_id_recording_val = self_id_recording_list[key];
            var version_id = self_id_recording_val["version_id"]

            if(version_id.includes("v_effect")) {
                var splVID = version_id.split("_");
                var version_no = parseInt(splVID[splVID.length-1])
                if(version_no > max_version_no){
                    max_version_no = version_no
                }                
            }
        }
    }
    var new_version_no = max_version_no + 1
    var new_version_id = "v_effect_" + new_version_no.toString();
    return new_version_id;
}

export { storeFilterAppliedRecordingEntry };