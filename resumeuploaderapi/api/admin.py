from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id','name','email','dob','gender','state','location','pimage','cvdoc']
