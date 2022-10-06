import React from "react";

type Props = {
    dataType: DataType
}

const DataType = (props:Props) => {
    function addDataFields() {
        if(props.dataType){
            return props.dataType.dataFieldTypes.map((dataFieldType, i) => {
                return <p key={i}>{ dataFieldType.name }:<span>{ dataFieldType.type }</span></p>
            });
        }
    }

    return (
        <div className="DataType">
            <div className="TitleWrapper">
                <button className="B1">Delete</button>
                <h3>{ props.dataType.title }</h3>
                <button className="B1">Edit</button>
            </div>
            <div className="DataFields">
                { addDataFields() }
            </div>
        </div>
    )
}

export default DataType;