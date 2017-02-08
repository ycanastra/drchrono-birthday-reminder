from django.conf.urls import url
from django.views.generic import TemplateView
from rest_framework.urlpatterns import format_suffix_patterns

from birthdays import views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='birthdays/index.html'), name='home'),
    url(r'^api/patients$', views.PatientList.as_view(), name='patients'),
    url(r'^api/personalmessage/(?P<recipientId>[0-9]+)$', views.PersonalMessageItem.as_view(), name='personalmessage'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
