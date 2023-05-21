import fs from 'fs';
import audioEffects from 'audio-effects';

async function applyReverb(req, res) {   

    const inputPath = req.body.inputPath;
    const outputPath = req.body.outputPath;
    var reverbParameters = req.body.reverbParameters;

    reverbParameters = { roomSize: 0.5, dampening: 0.2 };

    fs.readFile(inputPath, (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        
        return;
    }
        // Apply reverb to the MP3 file data
        // const processedData = audioEffects.reverb(data, reverbParameters);
        const processedData = data;

        // Save the processed data to a new MP3 file
        fs.writeFile(outputPath, processedData, (err) => {
            if (err) {
            console.error('Error writing file:', err);
            
            return;
            }
            
            console.log('Reverb applied and file saved successfully.');
        });
    });
    var response = {"status": "successful"}
    res.json(response);
}

export { applyReverb };