"""This module contains a group of helper functions for the requests."""


def is_user_type_gestor(request) -> bool:
    """Verify if the user belongs to the group gestor.

    Parameters:
        request (Request): contains the information about the client.

    Returns:
        is_gestor (bool): return true or false if the user is gestor.

    """
    is_gestor = request.user.groups.filter(name__icontains="gestor").count() == 0
    return is_gestor
