from django.dispatch import receiver  # receiver are signals
from django.db.models.signals import pre_save # import the prev method sign
from .models import LvForm;
from datetime import date


def lvform_pre_save(sender, instance,*args, **kwargs):

#! prevent update case_number when update data
    if instance.case_number is None:
        print("instancia vazia")
        print(instance)
        # get Current year 
        current_year = date.today().year
        
        #generate uuid to case_number
        instance.case_number = f'{current_year}{instance.uuid.time_mid}'

# load pre_save sign
pre_save.connect(lvform_pre_save, sender=LvForm)



