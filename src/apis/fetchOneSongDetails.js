import { readDataFromDbSpecificQuery } from '../db/readDb.js';

async function fetchSongDetailsBasedOnSongID(req, res) {
    try {
        const song_id = req.body.song_id;

        var dbDataSongMaster = await readDataFromDbSpecificQuery('/Song_Master', "song_id", song_id);
        dbDataSongMaster = Object.values(dbDataSongMaster)[0];
    
        var response = {};

        var song_original_genre = dbDataSongMaster["song_original_genre"];
        var song_original_scale = dbDataSongMaster["song_original_scale"];
        var song_original_tempo = dbDataSongMaster["song_original_tempo"];

        response["default_scale"] = song_original_scale;
        response["default_tempo"] = song_original_tempo;
        response["default_genre"] = song_original_genre;

        var triplet_list = [];

        var dbDataAnnSong = await readDataFromDbSpecificQuery('/Annotated_Song', "master_song_id", song_id);

        for (let key in dbDataAnnSong) {
            if (dbDataAnnSong.hasOwnProperty(key)) {
                const value = dbDataAnnSong[key];

                var master_genre = value["master_genre"];
                var master_scale = value["master_scale"];
                var master_tempo = value["master_tempo"];

                triplet_list.push({"scale": master_scale, "tempo": master_tempo, "genre": master_genre});
            }
        }

        response["possible_triplets"] = triplet_list;            
    
        res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export { fetchSongDetailsBasedOnSongID };