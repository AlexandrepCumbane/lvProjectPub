from django.dispatch import receiver  # receiver are signals
from django.db.models.signals import pre_save; # import the prev method sign
from django.db.models.signals import pre_save
from .models import LvForm;


@receiver(pre_save, sender=LvForm)
def ensure_casenumber_exists(sender, **kwargs):
    exit



def ensure_casenumber_exists(sender, instance,created, **kwargs):
    if created== False:
        instance.lvform.save()
        print('case_number')
