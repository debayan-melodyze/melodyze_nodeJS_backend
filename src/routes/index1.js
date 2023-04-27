const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
    AllSongsFetcher,
    RecordedSongsFetcher,
    SongDetailsFetcher,
    AllowedFilterListFetcher,
    GenerateBackgroundWav,
    GenerateBackgroundWavFilter,
    InsertNewRecordingEntryFilter,
    InsertNewRecordingEntry,
    InsertFinalRecordingEntry
} = require("./src");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const api = express.Router();

class GetAllSongs {
    static async post(req, res) {
        try {
            const { category } = req.body;
            const obj = new AllSongsFetcher(category);
            const response = await obj.getAllSongs();
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

class GetAllUserRecording {
    static async post(req, res) {
        try {
            const { user_id } = req.body;
            const obj = new RecordedSongsFetcher(user_id);
            const response = await obj.getRecordedSongs();
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

class GetSongDetails {
    static async post(req, res) {
        try {
            const { song_id } = req.body;
            const obj = new SongDetailsFetcher(song_id);
            const response = await obj.getSongDetails();
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

class GetFilterDetails {
    static async post(req, res) {
        try {
            const {
                song_id,
                annotated_song_id,
                version_id,
                tempo,
                scale,
                genre,
            } = req.body;
            const obj = new AllowedFilterListFetcher(
                song_id,
                annotated_song_id,
                version_id,
                tempo,
                scale,
                genre
            );
            const response = await obj.getListOfFilters();
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

class WavGenerator {
    static async post(req, res) {
        try {
            const { song_id, tempo, scale, genre } = req.body;
            const obj = new GenerateBackgroundWav(
                genre,
                tempo,
                scale,
                song_id
            );
            const { wav_path, lyrics_json, annotated_song_id, version_id } =
                await obj.getAnnotatedSong();
            const response = {
                wav_path,
                lyrics_json,
                annotated_song_id,
                version_id,
            };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

class BgmFilter {
    static async post(req, res) {
        try {
            const {
                song_id,
                annotated_song_id,
                version_id,
                genre,
                tempo,
                scale,
            } = req.body;
            const obj = new GenerateBackgroundWavFilter(
                genre,
                tempo,
                scale,
                song_id
            );
            const { wav_path } = await obj.getAnnotatedSong();
            const response = { wav_path, annotated_song_id, version_id };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}




