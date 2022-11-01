import React, { FunctionComponent, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Header from './parts/Header';

type Props = {
    ServerProps: ServerPropsType
};

type Shape = {
    startingPoint: [ number, number ],
    curves: {
        firstHandle: [ number, number ],
        secondHandle: [ number, number ],
        end: [ number, number ]
    }[]
};

function printCoordinate(coordinate:[number, number]) {
    return `${coordinate[0]},${coordinate[1]}`
}

const App:FunctionComponent<Props> = (props) => {
    const [shapes, setShapes] = useState<Shape[]>([{
        startingPoint: [100,250],
        curves: [
            {
                firstHandle: [100,100],
                secondHandle: [400,100],
                end: [400,250]
            }, 
            {
                firstHandle: [700,100],
                secondHandle: [700,400],
                end: [700,250]
            }
        ]
    }]);
    const renderedShapes = shapes.map((shape, i) => {
        const curveInstrunctions = shape.curves.map(curve => {
            return `C${printCoordinate(curve.firstHandle)} ${printCoordinate(curve.secondHandle)} ${printCoordinate(curve.end)} `;
        });
        return <div key={i}>
            <svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
                <path d={`M${printCoordinate(shape.startingPoint)} ${curveInstrunctions}`}/>
            </svg>
        </div>
    });

    return (<>
        <Header serverProps={props.ServerProps}></Header>
        <main>
            {renderedShapes}
        </main>
    </>)
}

if (typeof window !== 'undefined') {
    hydrateRoot( document.getElementById('root') as HTMLElement, <App ServerProps={window.ServerProps}/> );
}

export default App;