import { execSync, exec, ChildProcess } from 'child_process';
import { resolve } from 'path';
import fs from 'fs';

let key = {};
const indexFile = "import React from 'react'; import ReactDOM from 'react-dom/client'; import {ServerPropsType} from '../../server'; import __App__ from './__App__'; declare global {interface Window{ServerProps:ServerPropsType;}}; ReactDOM.hydrateRoot( document.getElementById('root') as HTMLElement, <__App__/> );"

let server:ChildProcess = exec('node public/server.js');

console.log( '\nWatching!\n\n' );
watch();

function watch(){
    try {
        fs.watch('./styles', (eventType, trigger) => {
            execSync('sass styles:public/styles');
            restartServer(trigger);
        });
    } catch { null }
    
    try{
        fs.watch('./pages', (eventType, trigger) => {
            execSync('tsc');
        
            key = JSON.stringify(fs.readFileSync(resolve('./public/src/key.json')).toString());
            
            if(fs.existsSync(resolve('./client/src/' + trigger))) fs.rmSync(resolve('./client/src/' + trigger));
        
            var currentFile = fs.readFileSync(resolve('pages/' + trigger)).toString();
            currentFile = currentFile.split("/parts").join("");
            fs.writeFileSync('client/src/' + trigger, currentFile);
        
            const newFile = indexFile.replaceAll('__App__', trigger.split('.tsx')[0]).split("/>").join(' ServerProps={window.ServerProps}/>');
        
            fs.writeFileSync('client/src/index.tsx', newFile);
            execSync('cd client && npm run build');
        
            const compiledFiles = fs.readdirSync(resolve('./client/build/static/js')).toString().split(',');
            fs.renameSync('client/build/static/js/' + compiledFiles[0], 'public/src/' + compiledFiles[0]);
            fs.renameSync('client/build/static/js/' + compiledFiles[2], 'public/src/' + compiledFiles[2]);
        
            key = {...key, [trigger.split('.tsx')[0]]: compiledFiles[0] };
        
            restartServer(trigger);
        });
    } catch { null }
    
    try{
        fs.watch('./pages/parts', (eventType, trigger) => {
            execSync('tsc');
    
            if(fs.existsSync(resolve('./client/src/' + trigger))) fs.rmSync(resolve('./client/src/' + trigger));
            var currentFile = fs.readFileSync(resolve('pages/' + trigger)).toString();
            fs.writeFileSync('client/src/' + trigger, currentFile);
        
            restartServer(trigger);
        });
    } catch { null }

    try{
        fs.watch('./routes', (eventType, trigger) => {
            execSync('tsc');
            restartServer(trigger);
        });
    } catch { null }

    try{
        fs.watch('./utils', (eventType, trigger) => {
            execSync('tsc');
            restartServer(trigger);
        });
    } catch { null }

    try{
        fs.watch('./server.tsx', (eventType, trigger) => {
            execSync('tsc');
            restartServer(trigger);
        });
    } catch { null }
}

function restartServer(fileName?:string){
    if(server.kill()){
        server = exec('node public/server.js');
        console.log('\nCompiled: ' + fileName + '\nWaiting for changes...\n\n');
    } else {
        console.log('Failed to restart server.');
    }
}

export default watch;