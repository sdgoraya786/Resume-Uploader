from django.db import models

STATE_CHOICES = ((
    ('Punjab','Punjab'),
    ('Sindh','Sindh'),
    ('Balochastan','Balochastan'),
))

class Profile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    dob = models.DateField(auto_now=False, auto_now_add=False)
    gender = models.CharField(max_length=100)
    state = models.CharField(choices=STATE_CHOICES, max_length=50)
    location = models.CharField(max_length=100)
    pimage = models.ImageField( upload_to='pimages', blank=True)
    cvdoc = models.FileField( upload_to='cvdocs', blank=True)