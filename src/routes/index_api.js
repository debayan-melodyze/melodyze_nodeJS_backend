import express from 'express';

const router = express.Router();

import { fetchSongsBasedOnCategory } from '../apis/fetchAllSongList.js';
import { fetchRecordingsBasedOnUserID } from '../apis/fetchAllUserRecording.js';
import { fetchSongDetailsBasedOnSongID } from '../apis/fetchOneSongDetails.js';
import { fetchVocalFilters } from '../apis/fetchAllVocalFilters.js';
import { fetchOneBGMBasedOnSongIDGenreTempoScale } from '../apis/fetchOneBGM.js';
import { storeMergedAudioVideo } from '../apis/storeMergedAV.js';
import { storeNewRecordingEntry } from '../apis/storeNewRecordingEntry.js';
import { storeFilterAppliedRecordingEntry } from '../apis/applyVocalFilter.js';

router.post('/get_all_songs', fetchSongsBasedOnCategory);
router.post('/get_all_user_recording', fetchRecordingsBasedOnUserID);
router.post('/get_song_details', fetchSongDetailsBasedOnSongID);
router.post('/get_filter_details', fetchVocalFilters);
router.post('/generate_bgm', fetchOneBGMBasedOnSongIDGenreTempoScale);
router.post('/final_save', storeMergedAudioVideo);
router.post('/new_recording', storeNewRecordingEntry);
router.post('/apply_vocal_filter', storeFilterAppliedRecordingEntry);

export default router;
