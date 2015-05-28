from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^tasks/new', views.create_task),
    url(r'^tasks/complete', views.complete_task),
    url(r'^tasks/delete', views.delete_task),
]