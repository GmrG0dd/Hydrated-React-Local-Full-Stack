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

    function renderDataTypes(){
        return dataTypes.map((type, index) => {
            return <DataType key={index} dataType={type} deleteData={deleteData}></DataType>
        });
    }

    const deleteData = async (inputData:DataType) => {
        let response = await fetch('/admin', {
            headers: {
                'content-type': "application/json"
            },
            method: 'DELETE',
            body: JSON.stringify(inputData)
        });
        
        response = await response.json();
        console.log(response);
        if(response) setDataTypes([...dataTypes].splice(dataTypes.indexOf(inputData), 1));
    }

    const [tempDataType, setTempDataType] = useState<ReactElement>(<></>);

    function addTempDataType() {
        setTempDataType(<TempDataType cancelTempData={cancelTempData} confirmDataType={confirmDataType} ></TempDataType>);
    }

    const confirmDataType = async (inputData:DataType) => {
        let response = await fetch('/admin', {
            headers: {
                'content-type': "application/json"
            },
            method: 'POST',
            body: JSON.stringify(inputData)
        });
        
        response = await response.json();
        if(!response) return;

        setDataTypes([...dataTypes, inputData]);
        setTempDataType(<></>);
    }

    const cancelTempData = () => {

        setTempDataType(<></>);
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