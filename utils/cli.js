const { execSync } = require('child_process')

try {
    console.log('\nInstalling Dependencies...\n');

    execSync('git clone --depth 1 https://github.com/GmrG0dd/Hydrated-React-Local-Full-Stack.git');

    execSync('cd Hydrated-React-Local-Full-Stack && npm install');

    execSync('cd Hydrated-React-Local-Full-Stack/client && npm install');

    execSync('cd ..');

    console.log('\nReady!\n');
} catch (err){
    console.log(err.toString());
}