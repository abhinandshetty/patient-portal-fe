import React, { useState, useRef, MutableRefObject } from 'react';
import { Button, Icon, Modal, Spinner, Text } from '@innovaccer/design-system';
import './index.css';
import { patientAPI } from '../../api';

interface IUploadCSVProps {
  onSuccess: ()=>void
}

const UploadCSV: React.FC<IUploadCSVProps> = ({ onSuccess } : IUploadCSVProps) => {
  const [ open, setOpen ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ success, setSuccess ] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  
  const onClickUpload = () => {
    setLoading(true);
    
    const formData  = new FormData();
    formData.append("patients", (fileRef as MutableRefObject<any>).current.files[0]);
    
    patientAPI.uploadPatientCSV(formData)
      .then(() => setSuccess(true))
      .finally(()=> setLoading(false))
  }

  const onClose = () => {
    setOpen(false);
    (fileRef as MutableRefObject<any>).current.value = "";
    if(success) onSuccess();
  }

  return (
    <>
      <Button appearance="primary" icon="backup" className="ml-4 upload_btn" onClick={() => setOpen(true)}>Upload Patient Records</Button>
      <Modal
        open={open}
        dimension="medium"
        backdropClose
        onClose={onClose}
        headerOptions={{
          heading: 'Upload Patient Records'
        }}
        footer={(
          <>
            <Button appearance="success" icon="backup" className="ml-4" onClick={onClickUpload}>Upload</Button>
            <a href="/sample_csv.csv" download>
              <Button appearance="primary" icon="get_app" className="ml-4">
                Download Sample CSV
              </Button>
            </a>
            
          </>
        )}
      >
        {
          loading ? (
            <div className="d-flex">
              <Spinner appearance="primary" size="medium" />
              <Text appearance="default" size="regular">
                Uploading...
              </Text>
            </div>
          ) : (
            <>
              <div className="mt-6">
                <input type="file" ref={fileRef} accept=".csv" />
              </div>
              { success && (
                <div className="mt-6">
                  <Icon className="align-bottom" appearance="success" name="check_box" size={20} />
                  <span>Patient records uploaded successfully</span>
                </div>
              )}
            </>
          )
        }
      </Modal>
    </>
  );
}

export default UploadCSV;
