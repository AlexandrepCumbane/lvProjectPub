from rest_framework.permissions import BasePermission
from wq.db.rest.model_tools import get_ct


class ModelPermissions(BasePermission):
    METHOD_PERM = {
        'GET': 'view',
        'HEAD': 'view',
        'OPTIONS': 'view',
        'POST': 'add',
        'PUT': 'change',
        'PATCH': 'change',
        'DELETE': 'delete',
    }

    authenticated_users_only = True

    def has_permission(self, request, view):
        if getattr(view, 'model', None) is None:
            return True

        # Added filter to not allow inactive users
        if not request.user or not request.user.is_active or (
           not request.user.is_authenticated 
           and self.authenticated_users_only):
            return False
        
        user = request.user

        ct = get_ct(view.model)
        result = has_perm(user, ct, self.METHOD_PERM[request.method])
        return result


def has_perm(user, ct, perm):
    if perm == 'view':
        return True
    if isinstance(ct, str):
        perm = '%s_%s' % (ct, perm)
    else:
        perm = '%s.%s_%s' % (ct.app_label, perm, ct.model)

    if user.is_authenticated:
        return user.has_perm(perm)
    else:
        from django.conf import settings
        return perm in getattr(settings, 'ANONYMOUS_PERMISSIONS', {})
