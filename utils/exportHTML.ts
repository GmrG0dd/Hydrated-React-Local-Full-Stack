import fs from 'fs';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';

declare global {
  interface Window {
      ServerProps:ServerPropsType;
  }
}

function exportHTML(reactComponent:ReactElement<any>, fileName:string, inputServerProps?:ServerPropsType | {}){
  const key = JSON.parse(fs.readFileSync('./src/public/JS/key.json').toString());
  if(!inputServerProps) inputServerProps = {}
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
            `<link rel="stylesheet" type="text/css" href="/CSS/${fileName}.css">` +
            '<link rel="stylesheet" type="text/css" href="/CSS/global.css">' +
            `<script>window.ServerProps=${JSON.stringify(inputServerProps)}</script>` +
          '</head>' +
          '<body>' +
            `<div id="root">${renderToString(reactComponent)}</div>` +
            `<script src="/JS/${key[fileName]}"></script>` + 
          '</body>' +
        '</html>'
  )
}

export default exportHTML;