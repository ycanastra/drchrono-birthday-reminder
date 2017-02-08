from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from social.apps.django_app.default.models import UserSocialAuth

from .models import Employee, Patient, PersonalMessage
from .serializers import PatientSerializer, PersonalMessageSerializer

class PatientList(APIView):
    # Returns all patients that is accessible by currently authenticated user
    def get(self, request):
        authenticatedEmployeeId = UserSocialAuth.objects.all()[0].extra_data['current_id']
        authenticatedEmployee = Employee.objects.get(id=authenticatedEmployeeId)
        patients = Patient.objects.filter(employees=authenticatedEmployee)

        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)


class PersonalMessageItem(APIView):
    # Returns personal message between the currently authenticated user and the provided recipient
    def get(self, request, recipientId):
        authenticatedEmployeeId = UserSocialAuth.objects.all()[0].extra_data['current_id']
        authenticatedEmployee = Employee.objects.get(id=authenticatedEmployeeId)

        personalMessage = PersonalMessage.objects.get_or_create(
            sender = authenticatedEmployee,
            recipient = Patient.objects.get(id=recipientId)
        )[0]

        serializer = PersonalMessageSerializer(personalMessage)
        return Response(serializer.data)

    def put(self, request, recipientId):
        newMessage = request.data['message']

        authenticatedEmployeeId = UserSocialAuth.objects.all()[0].extra_data['current_id']
        authenticatedEmployee = Employee.objects.get(id=authenticatedEmployeeId)

        personalMessage = PersonalMessage.objects.get(
            sender = authenticatedEmployee,
            recipient = Patient.objects.get(id=recipientId)
        )

        personalMessage.message = newMessage
        personalMessage.save()

        serializer = PersonalMessageSerializer(personalMessage)
        return Response(serializer.data)
