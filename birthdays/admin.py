from django.contrib import admin
from .models import Employee, Patient, PersonalMessage

admin.site.register(Employee)
admin.site.register(Patient)
admin.site.register(PersonalMessage)
