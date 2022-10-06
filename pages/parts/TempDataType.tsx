import React, { FunctionComponent, useState } from "react";

type Props = {
    confirmDataType: (inputData: DataType) => void,
    cancelTempData: () => void
}

const dataFieldOptions = [
    'text',
    'number',
    'true / false',
    'date',
    'User'
]

const TempDataType:FunctionComponent<Props> = (props:Props) => {
    const [ dataTypeName, setDataTypeName] = useState('');
    const [ dataFields, setDataFields ] = useState([{name: '', type: 'text'}]);

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

    return (
        <div className='TempDataType'>
            <div className='ControllerButtons'>
                <input onChange={e => {updateTitle(e)}} placeholder="-Name-" value={dataTypeName}></input>
                <div className='ButtonsWrapper'>
                    <button onClick={() => {props.cancelTempData()}} className='Cancel'>Cancel</button>
                    <button onClick={() => {props.confirmDataType({title: dataTypeName, dataFieldTypes: dataFields})}} className='Save'>Save</button>
                </div>
            </div>
            {renderDataFields()}
            <button onClick={() => {addDataField()}} className="AddDataField">+</button>
        </div>
    );
}

export default TempDataType;