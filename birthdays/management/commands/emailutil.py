from datetime import datetime
from django.core.management.base import BaseCommand, CommandError

from birthdays.models import Patient, PersonalMessage

class Command(BaseCommand):
    help = 'Emails birthdays messages to the appropriate patients along with the personal messages'

    def handle(self, *args, **options):
        today = datetime.today()
        patientsToEmail = Patient.objects.filter(
            birthday__day=today.day,
            birthday__month=today.month
        )

        if len(patientsToEmail) == 0:
            print 'No patients to email today'

        for patient in patientsToEmail:
            if patient.email == None:
                continue

            emailRecipient = patient.email
            emailSubject = 'Birthday wishes from Example Hospital'
            emailBody = 'Hello {0} {1},\n\nExample Hospital wanted to wish you a happy birthday!'.format(patient.firstName, patient.lastName)

            personalMessages = PersonalMessage.objects.filter(recipient=patient)

            if len(personalMessages) != 0:
                emailBody += '\n\nHere are some personal messages from our employees.\n'

            for personalMessage in personalMessages:
                if personalMessage.message != '':
                    emailBody += '\n{0}\n'.format(personalMessage.message)

            # sendEmail(emailRecipient, emailSubject, emailBody)
            print 'Sent email to ' + emailRecipient
            print emailSubject
            print emailBody
