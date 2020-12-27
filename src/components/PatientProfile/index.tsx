import React, { useEffect, useState } from 'react';
import { Card, Column, Heading, Icon, Input, Label, Row, Text } from '@innovaccer/design-system';
import { useHistory, useParams } from 'react-router-dom';
import './index.css';
import { patientAPI } from '../../api';

interface IPatientProfileState {
  name: string;
  age: string;
  gender: string;
  contact: string;
}

const PatientProfile: React.FC = (): JSX.Element => {
  const { id } = useParams<{id: string}>();
  const [ patient, setPatient ] = useState<IPatientProfileState>({ name : '', age: '', gender: '', contact: ''});
  const history = useHistory();

  const getPatientProfile = () => {
    patientAPI.getPatientById(id)
      .then(res => setPatient({...res.patient}))
  }
  
  useEffect(() => {
    getPatientProfile();
  }, [])
  
  return (
    <div className="container pt-10 patient-profile">
      <Row css className="justify-content-center">
        <Column sizeXL="6">
          <Card className="m-auto px-6 py-6" style={{background: '#fff'}}>
            <div className="mb-8 back_link" role="link" tabIndex={0} onClick={() => history.push(`/patients`)}>
              <Icon size={20} className="align-bottom back_arrow" name='arrow_back' />
              <Text className="ml-2 back_text">Patient List</Text>
            </div>
            <Heading className="mb-7" size="l">Patient Profile</Heading>
            <Label withInput>Name</Label>
            <Input
              name="input"
              type="text"
              className="mb-6"
              disabled
              value={patient.name}
            />
            <Label withInput>Age</Label>
            <Input
              name="input"
              className="mb-6"
              type="text"
              disabled
              value={patient.age}
            />
            <Label withInput>Gender</Label>
            <Input
              name="input"
              className="mb-6"
              type="text"
              disabled
              value={patient.gender}
            />
            <Label withInput>Contact</Label>
            <Input
              name="input"
              className="mb-6"
              type="text"
              disabled
              value={patient.contact}
            />
          </Card>
        </Column>
      </Row>
    </div>
  );
}

export default PatientProfile;
