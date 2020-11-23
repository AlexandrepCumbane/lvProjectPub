"""This module contains a group of helper functions for the requests."""


def is_user_type_operator(request) -> bool:
    """Verify if the user belongs to the group gestor.

    Parameters:
        request (Request): contains the information about the client.

    Returns:
        is_gestor (bool): return true or false if the user is gestor.

    """
    is_gestor = request.user.groups.filter(name__icontains="gestor").count() == 0
    return is_gestor


def is_user_type_gestor(request) -> bool:
    """Verify if the user belongs to the group operator.

    Parameters:
        request (Request): contains the information about the client.

    Returns:
        is_operator (bool): return true or false if the user is operator.

    """
    print("Operator: ", request.user.groups.filter(name__icontains="operador").count())
    is_operator = request.user.groups.filter(name__icontains="operador").count() == 0
    return is_operator
