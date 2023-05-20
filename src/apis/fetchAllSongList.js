import { readDataFromDbWholeTable, readDataFromDbSpecificQuery } from '../db/readDb.js';

async function fetchSongsBasedOnCategory(req, res) {
    try {
      const category = req.body.category;
      var dbData;
      
      if (category === "all") {
        dbData = await readDataFromDbWholeTable('/Song_Master');
      }
      else {
        dbData = await readDataFromDbSpecificQuery('/Song_Master', "master_song_category", category);
      }    
  
      const response = await generateResponse(dbData)
  
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

async function generateResponse(dbData) {
    var response = {};
    for (let key in dbData) {
        if (dbData.hasOwnProperty(key)) {
          const value = dbData[key];
          
          var song_id = value["song_id"]
          var song_name = value["song_name"]
          var song_status = value["song_status"]
          var song_thumbnail_file_location = value["song_thumbnail_file_location"]

          if(song_status !== "active") {
            continue;
          }

          var data = {
            "song_thumbnail_path": song_thumbnail_file_location,
            "song_name": song_name,
            "artist_name": ""
          }
          response[song_id] = data
        }
    }
    return response
}

export { fetchSongsBasedOnCategory };

