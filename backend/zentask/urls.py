from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("ZenTask API is running!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/tasks/', include('tasks.urls')),
    path('', home),  # This will serve a message at the root URL
]