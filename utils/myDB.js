const fs = require('fs');
const resolve = require('path').resolve;

/**
 * default JSON file template
 */
let data = {
    schemas: {},
    data: {}
}

/**
 * failsafe variable to prevent runtime errors
 */
let isLoading = true;


class db {
    /**
     * Attempts to read a previously saved file, then checks if it's valid formatting.
     * If it's an invalid format, it'll overwrite with the template file.
     */
    constructor(schemas) {
        if(schemas && typeof schemas == 'object') {
            Object.keys(schemas).forEach(name => {
                this.registerDataType(name, schemas[name]);
            });
        }

        fs.readFile('./public/db.json', (err, readData) => {
            if(err) {
                fs.writeFile('./public/db.json', JSON.stringify(data), ()=>{}); 
                return;
            }
            let previousData;
            try {
                previousData = JSON.parse(readData.toString());
            } catch (err) {
                fs.writeFile('./public/db.json', JSON.stringify(data), ()=>{});
                return;
            }
        
            if(previousData.data) {
                data.data = previousData.data;
                Object.keys(schemas).forEach(name => {
                    if(!data.data[name] || !Array.isArray(data.data[name])){
                        data.data = {...data.data, [name]: []};
                    }
                });
            }
        
            fs.writeFile('./public/db.json', JSON.stringify(data), ()=>{});
        });
        isLoading = false;
    }

    find(dataType, query) {
        if(isLoading) return false;

        let target = data.data[dataType];
        if(typeof dataType != 'string' || !target || !Array.isArray(target)) return false;

        if(query) {
            target = target.filter(dataSnippet => {
                return Object.keys(query).every(key => {
                    return dataSnippet[key] == query[key];
                });
            });
            if(target.length < 1) target = null;
        }
        
        if(!target) return false;
        return target;
    }

    write(dataType, inputData) {
        if(isLoading) return false;

        const target = data.data[dataType];
        const schema = data.schemas[dataType]
        if(typeof dataType != 'string' || !target || !schema || !Array.isArray(target)) return false;

        const isValid = validateSchema(schema, inputData);

        if(isValid) data.data[dataType] = [...data.data[dataType], inputData];
        else return false;

        fs.writeFile('./public/db.json', JSON.stringify(data), () => {});
        return true;

        function validateSchema(schemaObject, dataObject){
            return Object.keys(schema).every(key => {
                if(schema[key] == 'any') return true;
                if(typeof dataObject[key] == "object" && !Array.isArray(dataObject[key])) {
                    if(schemaObject[key] && dataObject[key]) {
                        return validateSchema(schemaObject[key], dataObject[key]);
                    }
                    else return false;
                }
                if(Array.isArray(dataObject[key])){
                    return dataObject[key].every((object, index) => {
                        const a = validateSchema((schemaObject[key])[index], object)
                        console.log((schemaObject[key])[index], object, a);
                        return a;
                    });
                }
                if(typeof dataObject[key] == "string" || typeof dataObject[key] == "number" || typeof dataObject[key] == "boolean"){
                    return schema[key] == typeof dataObject[key];
                }
                else return false;
            });
        }
    }

    delete(dataType, inputData) {
        if(isLoading) return false;

        const target = data.data[dataType];
        if(typeof dataType != 'string' || !target || !Array.isArray(target)) return false;

        const index = target.indexOf(inputData);
        if(index > -1){
            data.data[dataType].splice(index, 1);
            fs.writeFile('./public/db.json', JSON.stringify(data), () => {});
            return true;
        }
        return false;
    }

    registerDataType(name, schema) {
        if(typeof name != "string" || typeof schema != "object") return false;

        const validSchema = validateTypes(schema);
        if(validSchema) {
            data.schemas = {...data.schemas, [name]: validSchema};
            if(!data.data[name]) data.data = {...data.data, [name]: []};
            if(!isLoading) fs.writeFile('./public/db.json', JSON.stringify(data), () => {});
            return true;
        }
        return false;

        function validateTypes(inputSchema){
            let tester = {};
            Object.keys(inputSchema).forEach(key => {
                const value = inputSchema[key];
                if(typeof value == "string"){
                    switch(value) {
                        case 'string':
                            tester = {...tester, [key]: "string"};
                            break; 
                        case 'number':
                            tester = {...tester, [key]: "number"};
                            break;
                        case 'boolean':
                            tester = {...tester, [key]: "boolean"};
                            break;
                        case 'any':
                            tester = {...tester, [key]: "any"};
                            break;
                    }
                } else if(typeof value == "object" && !Array.isArray(value)){
                    const subKeys = validateTypes(value);
                    if(subKeys) {
                        tester = {...tester, [key]: subKeys};
                    }
                } else if(Array.isArray(value)){
                    const returnedArray = value.map(subKey => {
                        const subArray = validateTypes(subKey);
                        if(subArray) return subArray;
                    });

                    tester = {...tester, [key]: returnedArray}
                }
            });
            return tester;
        }
    }
}

module.exports = db;