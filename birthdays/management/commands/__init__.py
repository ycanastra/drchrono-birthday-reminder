from django.core.management.base import BaseCommand, CommandError
from birthdays.models import Patient

class Command(BaseCommand):
    def handle(self, *args, **options):

        patients = Patient.objects.all()

        # self.stdout.write(self.style.SUCCESS('Successfully closed poll "%s"' % poll_id))
