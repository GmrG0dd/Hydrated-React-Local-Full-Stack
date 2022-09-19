import fs from 'fs';

const key = JSON.parse(fs.readFileSync('./public/src/key.json').toString());

declare global {
  interface Window {
      ServerProps:ServerPropsType;
}}


function exportHTML(react:string, fileName:string, serverPropsInput?:ServerPropsType){ 
    var serverProps;
    serverPropsInput ? serverProps = JSON.stringify(serverPropsInput) : serverProps = '{}';

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
            '<script>window.ServerProps=' + serverProps + '</script>' +
          '</head>' +
          '<body>' +
            '<div id="root">' + react + '</div>' +
            '<script src="/static/scripts/' + key[fileName] + '"></script>' + 
          '</body>' +
        '</html>'
    )
}

export default exportHTML;