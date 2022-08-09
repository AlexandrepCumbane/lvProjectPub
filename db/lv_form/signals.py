from django.dispatch import receiver  # receiver are signals
from django.db.models.signals import pre_save, post_save; # import the prev method sign
from .models import LvForm;


def lvform_pre_save(sender, instance,*args, **kwargs):
    print('lvform_pre_save')
    # !gerar o numero de casos ( case_number)
    instance.case_number = instance.uuid.time
    print(instance.uuid.time)
    if instance._state.adding:
        print ('Instance created!')
        print (instance)
    else:
        print ('Instance updated!')
        print (instance)

   

    # ! verificar se este numero instanciado existe na base de dados;

    #! verificar se esta sendo criado uma instancia de create ou de update
 
        

pre_save.connect(lvform_pre_save, sender=LvForm)



