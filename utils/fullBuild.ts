import { execSync, exec } from 'child_process';
import { resolve } from 'path';
import fs from 'fs';

let key = {};
const indexFile = "import React from 'react'; import ReactDOM from 'react-dom/client'; import {ServerPropsType} from '../../server'; import __App__ from './__App__'; declare global {interface Window{ServerProps:ServerPropsType;}}; ReactDOM.hydrateRoot( document.getElementById('root') as HTMLElement, <__App__/> );"

console.log("Compiling Typescript files.\n");
execSync('tsc');

console.log("Compiling Sass files.\n");
execSync('sass styles:public/styles');

if(fs.existsSync(resolve('./client/src'))) fs.rmSync(resolve('./client/src'), { recursive: true });
fs.mkdirSync(resolve('./client/src'));
if(fs.existsSync(resolve('./public/src'))) fs.rmSync(resolve('./public/src'), { recursive: true });
fs.mkdirSync(resolve('./public/src'));

const files:String[] = fs.readdirSync(resolve('./pages')).toString().split(',');
files.splice(files.length-1, 1);

const parts = fs.readdirSync(resolve('./pages/parts')).toString().split(',');

for(let i = 0; i < files.length; i++){
    var currentFile = fs.readFileSync(resolve('pages/' + files[i])).toString();
    currentFile = currentFile.split("/parts").join("");
    fs.writeFileSync('client/src/' + files[i], currentFile);
}

for(let i = 0; i < parts.length; i++){
    var currentFile = fs.readFileSync(resolve('pages/parts/' + parts[i])).toString();
    fs.writeFileSync('client/src/' + parts[i], currentFile);
}

console.log('Compiling React Files:');
for(let i = 0; i < files.length; i++){
    console.log((i+1) + ': ' + files[i]);

    const newFile = indexFile.replaceAll('__App__', files[i].split('.tsx')[0]).split("/>").join(' ServerProps={window.ServerProps}/>');

    fs.writeFileSync('client/src/index.tsx', newFile);
    execSync('cd client && npm run build');

    const compiledFiles = fs.readdirSync(resolve('./client/build/static/js')).toString().split(',');
    fs.renameSync('client/build/static/js/' + compiledFiles[0], 'public/src/' + compiledFiles[0]);
    fs.renameSync('client/build/static/js/' + compiledFiles[2], 'public/src/' + compiledFiles[2]);

    key = {...key, [files[i].split('.tsx')[0]]: compiledFiles[0] };
}

fs.writeFileSync('public/src/key.json', JSON.stringify(key));

console.log('\nListening!\n\n');
execSync('node public/server.js');