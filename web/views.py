from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def sobre_nosotros(request):
    return render(request, 'sobre_nosotros.html')

def servicios(request):
    return render(request, 'servicios.html')

def contacto(request):
    return render(request, 'contacto.html')
