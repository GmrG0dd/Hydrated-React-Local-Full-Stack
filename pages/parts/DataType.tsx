import React from "react";

type Props = {
    dataType: DataType,
    deleteData: (inputData:DataType) => {}
}

const DataType = (props:Props) => {
    function deleteThis(){
        props.deleteData(props.dataType);
    }

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
                <button onClick={deleteThis} className="B1">Delete</button>
                <h3>{ props.dataType.title }</h3>
                <button className="B2">Edit</button>
            </div>
            <div className="DataFields">
                { addDataFields() }
            </div>
        </div>
    )
}

export default DataType;