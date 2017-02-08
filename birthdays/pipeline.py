import requests
from datetime import datetime, date

from .models import Employee, Patient


def load_patients(*args, **kwargs):
    userResponse = kwargs.get('response')
    employeeId = userResponse['id']
    accessToken = userResponse['access_token']

    patients = fetchPatients(accessToken)
    for patient in patients:
        updatePatientModel(patient, employeeId)


def load_employee(*args, **kwargs):
    currentEmployee = kwargs.get('response')
    updateEmployeeModel(currentEmployee)

    social = kwargs.get('social')
    social.set_extra_data({'current_id': currentEmployee['id']})


def updatePatientModel(patient, employeeId):
    id = patient['id']
    firstName = patient['first_name']
    lastName = patient['last_name']


    if patient['date_of_birth'] != None:
        birthday = datetime.strptime(patient['date_of_birth'], '%Y-%m-%d')
    else:
        birthday = None

    if patient['email'] == '':
        email = None
    else:
        email = patient['email']

    patientInstance = Patient.objects.get_or_create(
        id = id,
        firstName = firstName,
        lastName = lastName,
        birthday = birthday,
        email = email
    )[0]

    patientInstance.employees.add(Employee.objects.get(id=employeeId))
    patientInstance.save()


def updateEmployeeModel(employee):
    id = employee['id']
    username = employee['username']

    Employee.objects.get_or_create(
        id = id,
        username = username
    )


def fetchPatients(accessToken):
    headers = {
    'Authorization': 'Bearer %s' % accessToken,
    }

    patients = []
    patients_url = 'https://drchrono.com/api/patients'

    while patients_url:
        data = requests.get(patients_url, headers=headers).json()
        patients.extend(data['results'])
        patients_url = data['next'] # A JSON null on the last page

    return patients
