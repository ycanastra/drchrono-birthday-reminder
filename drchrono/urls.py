from django.conf.urls import include, url
from django.views.generic import TemplateView
from django.contrib import admin

import views


urlpatterns = [
    url(r'^birthdays/', include('birthdays.urls')),
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),
    url(r'', include('social.apps.django_app.urls', namespace='social')),
    url(r'^admin/', admin.site.urls),
]
