import { execSync, spawn } from 'child_process';
import watch from 'node-watch';
import { resolve } from 'path';

console.log("\nCompiling Typescript files...\n");
execSync('tsc');

console.log("Compiling Sass files...\n");
execSync('sass styles:src/public/CSS');

console.log("Bundling React files...\n");
execSync('webpack');

console.log('\n');

const ignores = ['src', 'node_modules', '.git'];
watch(resolve('./'), { recursive: true, filter: /\.ts$|\.tsx$|\.scss$/ }, (eventType, trigger) => {
    if(!ignores.every(ignore => {
        return trigger.split('/').indexOf(ignore) == -1;
    })) return;

    const fileName = trigger.split('/')[trigger.split('/').length-1];
    console.log(`\nCompiling: ${fileName}`);

    try {
        if(trigger.split('.scss').length > 1) {
            execSync(`sass ${trigger}:src/public/CSS/${fileName.split('.scss').join('.css')}`);
        } else {
            if(trigger.split('/').indexOf('pages') > -1) {
                execSync('webpack');
            } else {
                execSync('tsc');
            }
        }
        if(server.kill('SIGTERM')){
            server = spawn('node', [resolve('src/server.js')], {stdio: 'inherit'});
            console.log('Success!\n\nWaiting for changes...\n\n');
        } else {
            console.log('\nServer was not fully ended.\n\n');
            return;
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        console.log('\nWaiting for changes...\n\n');
    }
});

let server = spawn('node', [resolve('src/server.js')], {stdio: 'inherit'});
console.log('\nWatching!\n\n');

process.on("exit", () => {
    if(!server.kill('SIGTERM')) console.log('\nServer was not fully ended\n\n');
});