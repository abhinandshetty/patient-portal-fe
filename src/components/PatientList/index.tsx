import React from 'react';
import { Column, Heading, Row, Table } from '@innovaccer/design-system';
import { FetchDataOptions } from '@innovaccer/design-system/dist/core/components/organisms/grid';
import { useHistory } from 'react-router-dom';
import UploadCSV from '../UploadCSV';
import { patientAPI } from '../../api';

const PatientList: React.FC = (): JSX.Element => {
  const loaderSchema = [
    {
      "name": "name",
      "displayName": "Name",
      "width": "25%"
    },
    {
      "name": "age",
      "displayName": "Age",
      "width": "25%"
    },
    {
      "name": "gender",
      "displayName": "Gender",
      "width": "25%"
    },
    {
      "name": "contact",
      "displayName": "Contact",
      "width": "25%"
    }
  ];

  const history = useHistory();

  const getData = (options: FetchDataOptions) : Promise<any> => patientAPI.getAllPatients(getQueryParams(options));

  const getQueryParams = (options: FetchDataOptions) => { 
    const searchTerm = `${options.searchTerm ? `&name=${options.searchTerm}` : ''}`;
    const sortBy = options.sortingList?.map(field => `${field.name}=${field.type === 'desc' ? -1 : 1}`);
    const page = `&page=${options.page ? options.page-1 : 0}`;
    const pageSize = `&pageSize=${options.pageSize}`
    
    return `${searchTerm}${sortBy?.length ? `&sort=${sortBy.join('~~')}` : ''}${page}${pageSize}`;
  }
  
  return (
    <div className="container pt-4 mt-8 patient-list" style={{maxWidth: 1000, boxShadow: '2px 0px 96px -62px', background: '#fff'}}>
      <Row css>
        <Column sizeXL="6" className="pt-2">
          <Heading className="mb-7" size="l">Patient Profile</Heading>
        </Column>
        <Column sizeXL="6" className="pt-4">
          <UploadCSV onSuccess={()=> window.location.reload()} />
        </Column>    
      </Row>
      <div className="row">
        <div className="m-auto pb-2">
          <Table 
            loaderSchema={loaderSchema}
            type="resource"
            fetchData={getData} 
            withHeader
            headerOptions={{
              withSearch: true
            }}
            withPagination
            pageSize={10}  
            onRowClick={row => history.push(`/patients/${row._id}`)}
          />
        </div>
      </div>
    </div>
  );
}

export default PatientList;
