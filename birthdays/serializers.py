from rest_framework import serializers
from .models import Patient, PersonalMessage


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id', 'firstName', 'lastName', 'birthday', 'email')


class PersonalMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalMessage
        fields = ('message', 'recipient')
