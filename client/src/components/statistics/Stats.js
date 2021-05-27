import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import "./Stats.css";


const PointersTable = (props) => {
    /*const potentialPointers = props.potentialPointers.length ? props.potentialPointers : props.database;
    let tableEntries = potentialPointers.map(pointer => ({
        ...pointer,
        title: <a href={pointer.url} className="active-pointer__link" target="_blank">{pointer.title}</a>
    }))*/
    const data = {
        columns: [
            {
                label: 'Hospital Name',
                field: 'hospital name',
                sort: 'asc'
            }, 
            {
                label: 'Hospital Location',
                field: 'hospital location',
                sort: 'asc'
            }, 
            {
                label: 'Name',
                field: 'name',
                sort: 'asc'
            }, 
            {
                label: 'Status',
                field: 'status',
                sort: 'asc'
            }
        ],
        /*rows: tableEntries*/
    }

    return (
        <div className="pointers-table-component" id="pointers-table">
            <MDBDataTable
                responsive 
                striped
                bordered
                autoWidth
                hover
                data={data}
                filter='status' 
                searchTop
                searchBottom={false}
            />  
        </div>
    );
}


const mapStateToProps = (state) => ({
    /*database: state.pointers.database,
    potentialPointers: state.pointers.potentialPointers*/
});


export default connect(mapStateToProps)(PointersTable);