import fs from 'fs';

const key = JSON.parse(fs.readFileSync('./public/src/key.json').toString());




function exportHTML(react:string, fileName:string){ 
    return (
        '<!DOCTYPE html>' +
        '<html lang="en">' +
          '<head>' +
            '<meta charset="utf-8" />' +
            '<link rel="icon" href="#" />' +
            '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
            '<meta name="theme-color" content="#000000" />' +
            '<meta name="description" content="Web site created using create-react-app"/>' +
            '<title>Web Builder</title>' +
            '<link rel="stylesheet" href="/static/styles/global.css">' +
            '<link rel="stylesheet" href="/static/styles/' + fileName + '.css">' +
          '</head>' +
          '<body>' +
            '<noscript>You need to enable JavaScript to run this app.</noscript>' +
            '<div id="root">' + react + '</div>' +
            '<script src="/static/scripts/' + key[fileName] + '"></script>' + 
          '</body>' +
        '</html>'
    )
}

export default exportHTML;