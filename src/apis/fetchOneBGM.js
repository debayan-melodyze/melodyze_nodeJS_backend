import { readDataFromDbSpecificQuery } from '../db/readDb.js';

async function fetchOneBGMBasedOnSongIDGenreTempoScale(req, res) {
    try {
        const song_id = req.body.song_id;
        const tempo = req.body.tempo;
        const genre = req.body.genre;
        const scale = req.body.scale;

        var dbDataAnnSong = await readDataFromDbSpecificQuery('/Annotated_Song', "master_song_id_genre_scale_tempo", 
        song_id+"_"+genre+"_"+scale+"_"+tempo);
        dbDataAnnSong = Object.values(dbDataAnnSong)[0];

        var wav_path = dbDataAnnSong["annotated_song_file_path"]; 
        var lyrics_json = dbDataAnnSong["lyrics_with_timeline_file_location"];
        var annotated_song_id = dbDataAnnSong["annotated_song_id"];
        var version_id = dbDataAnnSong["version_id"];

        var response = {"wav_path": wav_path, "lyrics_json": lyrics_json, "annotated_song_id": annotated_song_id,
                    "version_id": version_id}

        res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export { fetchOneBGMBasedOnSongIDGenreTempoScale };