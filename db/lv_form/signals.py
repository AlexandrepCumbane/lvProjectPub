from django.dispatch import receiver  # receiver are signals
from django.db.models.signals import pre_save, post_save; # import the prev method sign
from .models import LvForm;


def lvform_pre_save(sender, instance, *args, **kwargs):
    print('lvform_pre_save')
    print(sender,instance)
    # verified if case_number existing
    if instance.case_number is None:
        print('caso duplicado')
    else:
        Print(instance.case_number)

pre_save.connect(lvform_pre_save, sender=LvForm)



