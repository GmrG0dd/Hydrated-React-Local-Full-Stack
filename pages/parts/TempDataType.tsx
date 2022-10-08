import React, { FunctionComponent, useState } from "react";

type Props = {
    confirmDataType: (inputData: DataType, index?:number) => void,
    cancelTempData: (index?:number) => void,
    preloadedData?: [DataType, number]
}

const dataFieldOptions = [
    'text',
    'number',
    'true / false',
    'date',
    'User'
]

const TempDataType:FunctionComponent<Props> = (props:Props) => {
    let loadedData = [{name: '', type: 'text'}], loadedTitle = '';
    if(props.preloadedData) {
        loadedData = props.preloadedData[0].dataFieldTypes;
        loadedTitle = props.preloadedData[0].title;
    }

    const [ dataTypeName, setDataTypeName] = useState(loadedTitle);
    const [ dataFields, setDataFields ] = useState(loadedData);

    function renderDataFields(){
        return dataFields.map((field, i) => {
            return (<div key={i} className="DataField">
                <input onChange={e => {updateName(i, e)}} placeholder='--Name--' value={field.name}></input>
                <span>:</span>
                <select onChange={e => {updateType(i, e)}} value={field.type}>
                    { dataFieldOptions.map((option, j) => {
                        return <option key={j} value={option}>{option}</option>
                    }) }
                </select>
                <button onClick={() => {removeDataField(i)}}>X</button>
            </div>);
        })
    }

    function updateName(index:number, event:React.ChangeEvent){
        const newValue = (event.target as HTMLInputElement).value;

        let newDataFields = [...dataFields];
        newDataFields[index].name = newValue;

        setDataFields(newDataFields);
    }

    function updateType(index:number, event:React.ChangeEvent){
        const newValue = (event.target as HTMLSelectElement).value;

        let newDataFields = [...dataFields];
        newDataFields[index].type = newValue;

        setDataFields(newDataFields);
    }

    function addDataField(){
        setDataFields([...dataFields, {'name': '', 'type': 'text'}]);
    }

    function removeDataField(index:number) {
        const newDataFields = [...dataFields];
        newDataFields.splice(index, 1);
        setDataFields(newDataFields);
    }

    function updateTitle(e:React.ChangeEvent){
        setDataTypeName((e.target as HTMLInputElement).value);
    }

    function saveThis(inputData:DataType){
        if(props.preloadedData) props.confirmDataType({title: dataTypeName, dataFieldTypes: dataFields}, props.preloadedData[1]);
        else props.confirmDataType({title: dataTypeName, dataFieldTypes: dataFields});
    }

    function deleteThis(){
        if(props.preloadedData) props.cancelTempData(props.preloadedData[1]);
        else props.cancelTempData();
    }

    return (
        <div className='TempDataType'>
            <div className='ControllerButtons'>
                <button onClick={() => {deleteThis()}} className='Cancel'>Cancel</button>
                <input onChange={e => {updateTitle(e)}} placeholder="-Name-" value={dataTypeName}></input>
                <button onClick={() => {saveThis({title: dataTypeName, dataFieldTypes: dataFields})}} className='Save'>Save</button>
            </div>
            {renderDataFields()}
            <button onClick={() => {addDataField()}} className="AddDataField">+</button>
        </div>
    );
}

export default TempDataType;