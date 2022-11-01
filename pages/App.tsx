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
        startingPoint: [0,500],
        curves: [
            {
                firstHandle: [0,200],
                secondHandle: [500,200],
                end: [500,500]
            }, 
            {
                firstHandle: [500,200],
                secondHandle: [1000,800],
                end: [1000,500]
            }
        ]
    }]);

    const renderedShapes = shapes.map((shape, i) => {

        const curveInstrunctions = shape.curves.map(curve => {
            return `C${printCoordinate(curve.firstHandle)} ${printCoordinate(curve.secondHandle)} ${printCoordinate(curve.end)} `;
        });
        return <div key={i}>
            <svg preserveAspectRatio='xMidYMid' width="1" height="1" xmlns="http://www.w3.org/2000/svg">
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