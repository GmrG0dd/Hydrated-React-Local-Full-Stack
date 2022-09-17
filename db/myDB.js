import fs from 'fs';
import path from 'path';

let data = {
    dataTypes: {
        Users: {
            id: 'string',
            username: 'string',
            hash: 'string',
            salt: 'string',
            admin: 'boolean'
        },
        Pages: {
            id: 'string',
            
        }
    },
    data: {
        Users: []
    }
};

fs.readFile('public/db/db.json', (err, readData) => {
    if(err) fs.writeFileSync(path.resolve('public/db/db.json'), JSON.stringify(data));
    else data = JSON.parse(readData.toString());
});




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
        if(inputData.split('.').length < 2) return false; 
        var target = inputData.split('.').pop(), queryObject = inputData.split('.')[inputData.split('.').length - 1];
        var targetData = getTargetData(target);
        if(!targetData || typeof targetData != Array || !queryObject || !target) return false;

        for(let i = 0; i < targetData.length; i++){
            if((targetData[i])[queryObject] == query){
                targetData.splice(i, 1);
                fs.writeFileSync(path.resolve('public/db/db.json'), JSON.stringify(data));
                return true;
            };
        }

        return false;
    },

    registerDataType: (dataName, schema) => {
        if(!dataName || !schema || typeof dataName != String || typeof schema != Object) return false;
        if(!checkValidSchema(schema)) return false;

        data.dataTypes = {...data.dataTypes, [dataName]:schema};
        fs.writeFileSync(path.resolve('public/db/db.json'), JSON.stringify(data));
        return true;

        function checkValidSchema(inputObject) {
            let keys = Object.keys(inputObject)[i];

            for(let i = 0; i < keys.length; i++) {
                if(typeof inputObject[keys[i]] == Object){ 
                    if(!checkValidSchema(inputObject[keys[i]])) return false;
                }
                if(inputObject[keys[i]] != 'string' || inputObject[keys[i]] != 'number' || inputObject[keys[i]] != 'boolean' || inputObject[keys[i]] != 'array') return false;
            }
            return true;
        }
    },

    deleteDataType: (dataName) => {
        if(!dataName || typeof dataName != String) return false;
        if(Object.keys(data.dataTypes).indexOf(dataName) > 0) return true;
        else return false;
    }
}

function getTargetData(inputData) {
    const keys = inputData.split('.');
    if(keys.length < 1) return false;
    var target = data.data[keys.shift()];
    if(!target) return false;

    return target;
}

export default myDB;

