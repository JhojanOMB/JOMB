from django.urls import path
from . import views

app_name = 'web'

urlpatterns = [
    path('', views.index, name='index'),
    path('sobre-nosotros/', views.sobre_nosotros, name='sobre_nosotros'),
    path('servicios/', views.servicios, name='servicios'),
    path('contacto/', views.contacto, name='contacto'),
    path('portafolio/', views.portafolio, name='portafolio'),
]
