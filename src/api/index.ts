class API {
  protected baseUrl: string | undefined = process.env.REACT_APP_API_BASE;

  get(url: string, params: string = '') {
    return fetch(`${this.baseUrl}${url}${params ? `?${params}` : ''}`).then((response) =>
      response.json()
    );
  }

  post(url: string, body: any = {}) {
    return fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      body,
    }).then((response) => response.json());
  }
}

export class PatientAPI extends API {
  getAllPatients(params: string) {
    return this.get(`/api/patients`, params);
  }

  getPatientById(id: string) {
    return this.get(`/api/patients/${id}`);
  }

  uploadPatientCSV(data: FormData) {
    return this.post(`/api/patients`, data);
  }
}

export const patientAPI = new PatientAPI();
