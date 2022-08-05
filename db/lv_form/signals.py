from django.dispatch import receiver  # receiver are signals
from django.db.models.signals import pre_save, post_save; # import the prev method sign
from .models import LvForm;


def lvform_pre_save(*args, **kwargs):
    print('lvform_pre_save')
    print(args,kwargs)

pre_save.connect(lvform_pre_save, sender=LvForm)



