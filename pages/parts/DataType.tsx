import React from "react";

type Props = {
    dataType: DataType,
    deleteData: (inputData:number) => {},
    editData: (inputData:number) => {},
    index:number
}

const DataType = (props:Props) => {
    function deleteThis(){
        props.deleteData(props.index);
    }

    function editThis() {
        props.editData(props.index);
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
                <div><button onClick={deleteThis} className="B1">Delete</button></div>
                <h3>{ props.dataType.title }</h3>
                <div><button onClick={editThis} className="B3">Edit</button></div>
            </div>
            <div className="DataFields">
                { addDataFields() }
            </div>
        </div>
    )
}

export default DataType;