from django.db import models

# Could be doctor or staff member
class Employee(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=30, default='')

    def __str__(self):
        return self.username

class Patient(models.Model):
    employees = models.ManyToManyField(Employee)
    id = models.IntegerField(primary_key=True)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    birthday = models.DateField(null=True)
    email = models.CharField(max_length=40, null=True)

    def __str__(self):
        return self.firstName + ' ' + self.lastName

class PersonalMessage(models.Model):
    sender = models.ForeignKey(Employee)
    recipient = models.ForeignKey(Patient)
    message = models.CharField(max_length=1000)
