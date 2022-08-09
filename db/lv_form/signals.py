from django.dispatch import receiver  # receiver are signals
from django.db.models.signals import pre_save, post_save; # import the prev method sign
from .models import LvForm;


def lvform_pre_save(sender, instance,*args, **kwargs):
    print('lvform_pre_save')
    # !gerar o numero de casos ( case_number)
    numero = instance.case_number
    # case_number_verifiy = LvForm.objects.get(case_number=numero)
    # if case_number_verifiy:
    #     print('Novo caso: '+ instance)
    # else:
    #     print('Caso: '+ instance)

    if instance._state.adding:
        print ('Instance created!')
        print (instance)
    else:
        print ('Instance updated!')
        print (instance)

   

    # ! verificar se este numero instanciado existe na base de dados;

    #! verificar se esta sendo criado uma instancia de create ou de update
 
        

pre_save.connect(lvform_pre_save, sender=LvForm)



