from asyncio.windows_events import NULL
from django.dispatch import receiver  # receiver are signals
from django.db.models.signals import pre_save  # import the prev method sign
from .models import LvForm
from datetime import date


def lvform_pre_save(sender, instance, *args, **kwargs):

    print(instance)
    pass
    if instance is None:

        # get Current year
        current_year = date.today().year

        # generate uuid to case_number
        instance.case_number = f'{current_year}{instance.uuid.time_mid}'

        print("case number vazio")
    if instance is not None:
        print(instance)
    #     print("Case number nao vazio")


# load pre_save sign
pre_save.connect(lvform_pre_save, sender=LvForm)
