import { execSync } from 'child_process';
import { resolve } from 'path';
import fs from 'fs';

let key = {};
const indexFile = "import React from 'react'; import ReactDOM from 'react-dom/client'; import {ServerPropsType} from './serverProps'; import __App__ from './__App__'; declare global {interface Window{ServerProps:ServerPropsType;}}; ReactDOM.hydrateRoot( document.getElementById('root') as HTMLElement, <__App__/> );"


execSync("rm -r client/src");
execSync("mkdir client/src");
execSync("rm -r public/src");
execSync("mkdir public/src");

const files:String[] = execSync("cd pages && ls").toString().split('\n');
files.splice(files.length-2, 2);

const parts = execSync("cd pages/parts && ls").toString().split('\n');
parts.splice(parts.length-1, 1);

const serverProps = fs.readFileSync(resolve('utils/serverProps.ts'));
fs.writeFileSync('client/src/serverProps.ts', serverProps.toString());

for(let i = 0; i < files.length; i++){
    var currentFile = fs.readFileSync(resolve('pages/' + files[i])).toString();
    currentFile = currentFile.split("../utils/serverProps").join("./serverProps");
    currentFile = currentFile.split("/parts").join("");
    fs.writeFileSync('client/src/' + files[i], currentFile);
}

for(let i = 0; i < parts.length; i++){
    var currentFile = fs.readFileSync(resolve('pages/parts/' + parts[i])).toString();
    currentFile = currentFile.split("../../utils/serverProps").join("./serverProps");
    fs.writeFileSync('client/src/' + parts[i], currentFile);
}

for(let i = 0; i < files.length; i++){
    console.log((i+1) + ': ' + files[i]);

    var newFile = indexFile.replaceAll('__App__', files[i].split('.tsx')[0]);
    newFile = newFile.split("/>").join(' ServerProps={window.ServerProps}/>');

    fs.writeFileSync('client/src/index.tsx', newFile);
    execSync('cd client && npm run build');

    const compiledFiles = execSync("cd client/build/static/js && ls").toString().split('\n');
    fs.renameSync('client/build/static/js/' + compiledFiles[0], 'public/src/' + compiledFiles[0]);
    fs.renameSync('client/build/static/js/' + compiledFiles[2], 'public/src/' + compiledFiles[2]);

    key = {...key, [files[i].split('.tsx')[0]]: compiledFiles[0] };
}

fs.writeFileSync('public/src/key.json', JSON.stringify(key));
