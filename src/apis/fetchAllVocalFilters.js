import { readDataFromDbWholeTable } from '../db/readDb.js';

async function fetchVocalFilters(req, res) {
    try {
        var dbDataVocFilter = await readDataFromDbWholeTable('/Vocal_Filter_Master');

        var response = {}

        var voc_filter_list = []

        for (let key in dbDataVocFilter) {
            if (dbDataVocFilter.hasOwnProperty(key)) {
                const value = dbDataVocFilter[key];

                var frontend_appearance_seq_no = value["frontend_appearance_seq_no"];
                var vocal_filter_image_file_path = value["vocal_filter_image_file_path"];
                var vocal_filter_name = value["vocal_filter_name"];
                var vocal_filter_status = value["vocal_filter_status"];

                if(vocal_filter_status !== "active"){
                    continue;
                }

                voc_filter_list.push(
                    {"filter_name": vocal_filter_name, "status": "valid", "thumbnail_path": vocal_filter_image_file_path,
                     "seq_no": frontend_appearance_seq_no});
            }
        }

        response["vocal_filter_details"] = voc_filter_list            
    
        res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export { fetchVocalFilters };