const fs = require('fs');
const process = require('process');
const path = require('path');
const getArgs = require('./arguments');
const Jimp = require('jimp');

const args = getArgs();
const dir = `${args.folder}/` ?? './';
const pixel = args.pixel ? Number(args.pixel) : 50;

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {
            onFileContent(filename);
        });
    });
}

function main() {
    readFiles(dir, async (filename) => {

        let file = (`${dir}${filename}`);
        const image = await Jimp.read(file);
    
        image.pixelate(pixel)
            .write(`pixel/p-${Date.now()}.png`);
    
    }, (err) => {
      throw err;
    });

}
   
main();