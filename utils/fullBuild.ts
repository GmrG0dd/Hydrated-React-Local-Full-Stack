import { execSync } from 'child_process';
import { resolve } from 'path';
import fs from 'fs';

let key = {};
const indexFile = "import React from 'react'; import ReactDOM from 'react-dom/client'; import __App__ from './__App__'; ReactDOM.hydrateRoot( document.getElementById('root') as HTMLElement, <__App__ /> );";


execSync("rm -r client/src");
execSync("mkdir client/src");

const files:String[] = execSync("cd src && ls").toString().split('\n');
files.splice(files.length-1, 1);

for(let i = 0; i < files.length; i++){
    const currentFile = fs.readFileSync(resolve('src/' + files[i]));
    fs.writeFileSync('client/src/' + files[i], currentFile.toString());
}

for(let i = 0; i < files.length; i++){
    console.log((i+1) + ': ' + files[i]);

    fs.writeFileSync('client/src/index.tsx', indexFile.replaceAll('__App__', ''+files[i].split('.tsx')[0]) );
    execSync('cd client && npm run build');

    const compiledFiles = execSync("cd client/build/static/js && ls").toString().split('\n');
    fs.renameSync('client/build/static/js/' + compiledFiles[0], 'public/src/' + compiledFiles[0]);
    fs.renameSync('client/build/static/js/' + compiledFiles[2], 'public/src/' + compiledFiles[2]);

    key = {...key, [files[i].split('.tsx')[0]]: compiledFiles[0] };
}

fs.writeFileSync('public/src/key.json', JSON.stringify(key));
