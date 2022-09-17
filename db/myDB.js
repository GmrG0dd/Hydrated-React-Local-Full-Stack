import fs from 'fs';
import path from 'path';

/**
 * Specifies an empty database if none found.
 * Enter your data schemas down below, typing is irrelevant for now.
 */
let data = {
    dataTypes: {
        Users: {
            id: 'string',
            username: 'string',
            hash: 'string',
            salt: 'string',
            admin: 'boolean'
        }
    },
    data: {}
};
//Creates empty arrays for each data schema
Object.keys(data.dataTypes).map( key => {
    data.data = {...(data.data), [key]: []}
});

/**
 * Attempts to find a previous database, writes empty one from above if not found.
 */
fs.readFile('public/db/db.json', (err, readData) => {
    if(err) fs.writeFileSync(path.resolve('public/db/db.json'), JSON.stringify(data));
    else data.data = JSON.parse(readData.toString()).data;
});



//Exported object
const myDB = {
    find: (inputData, query) => {
        if(typeof inputData != 'string' || inputData.split('.').length < 2) return false;
        const keys = inputData.split('.');
        if(keys.length < 2) return false;

        var target = data.data[keys.shift().toString()];
        if(!target || target.length < 1) return false;

        let results = [];
        for(let i = 0; i < target.length; i++){
            let entryData = target[i];
            for(let j = 0; j < keys.length; j++){
                if(entryData[keys[j]]) entryData = entryData[keys[j]];
                else return false;
            }
            if(entryData === query) results.push(target[i]);
        }
        
        if(results.length > 0) return results;
        else return false;
    },

    write: (dataType, inputData) => {
        if(!data.data[dataType]) return false;

        data.data[dataType] = [...data.data[dataType], inputData];
        fs.writeFileSync(path.resolve('public/db/db.json'), JSON.stringify(data));
        return inputData;
    },

    delete: (inputData, query) => {
        if(typeof inputData != 'string' || inputData.split('.').length < 2) return false;
        const keys = inputData.split('.');
        if(keys.length < 2) return false;

        var target = data.data[keys.shift().toString()];
        if(!target || target.length < 1) return false;

        let result;
        for(let i = 0; i < target.length; i++){
            let entryData = target[i];
            for(let j = 0; j < keys.length; j++){
                if(entryData[keys[j]]) entryData = entryData[keys[j]];
                else return false;
            }
            if(entryData === query) results.push(target[i]);
        }

        return false;
    }
}

export default myDB;

