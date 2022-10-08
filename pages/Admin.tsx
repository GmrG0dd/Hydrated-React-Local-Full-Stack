import React, { FunctionComponent, ReactElement, useState } from 'react';
import Header from './parts/Header';
import DataType from './parts/DataType';
import TempDataType from './parts/TempDataType';

type Props = {
    ServerProps: ServerPropsType
}

const Admin:FunctionComponent<Props> = (props) => {
    if(!props.ServerProps.dataTypes) return <></>;
    const [dataTypes, setDataTypes] = useState<DataType[]>(props.ServerProps.dataTypes);
    const [isEditing, setIsEditing] = useState<number>(-1);

    function renderDataTypes(){
        return dataTypes.map((type, index) => {
            if(index == isEditing) return <TempDataType preloadedData={[type, index]} confirmDataType={confirmDataType} cancelTempData={cancelTempData}></TempDataType>;
            else return <DataType key={index} index={index} dataType={type} editData={editData} deleteData={deleteData}></DataType>
        });
    }

    const [tempDataType, setTempDataType] = useState<ReactElement>(<></>);

    function addTempDataType() {
        setTempDataType(<TempDataType cancelTempData={cancelTempData} confirmDataType={confirmDataType} ></TempDataType>);
    }

    const confirmDataType = async (inputData:DataType, index?:number) => {
        let postBody;
        index != undefined ? postBody = [inputData, dataTypes[index]] : postBody = [inputData];

        let response = await fetch('/admin', {
            headers: {
                'content-type': "application/json"
            },
            method: 'POST',
            body: JSON.stringify(postBody)
        });
        
        response = await response.json();
        if(!response) return;
        
        if(index != undefined){
            const newDataTypes = [...dataTypes];
            newDataTypes.splice(index, 1, inputData);
            setDataTypes(newDataTypes);
            setIsEditing(-1);
        } else {
            setDataTypes([...dataTypes, inputData]);
            setTempDataType(<></>);
        }
    }

    const cancelTempData = (index?:number) => {
        if(index) setIsEditing(-1);
        else setTempDataType(<></>);
    }

    const deleteData = async (index:number) => {
        let response = await fetch('/admin', {
            headers: {
                'content-type': "application/json"
            },
            method: 'DELETE',
            body: JSON.stringify(dataTypes[index])
        });
        
        response = await response.json();
        if(response) {
            const newDataTypes = [...dataTypes];
            newDataTypes.splice(index, 1);
            setDataTypes(newDataTypes);
        }
    }

    const editData = async (index:number) => {
        setIsEditing(index);
    }

    return (<>
        <Header serverProps={props.ServerProps}></Header>
        <main id="Main">
            <>{renderDataTypes()}</>
            {tempDataType}
            <button onClick={addTempDataType} className='AddDataButton'>Add Data Type +</button>
        </main>
    </>)
}

export default Admin;