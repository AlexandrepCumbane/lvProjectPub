from call_manager.urls import urlpatterns as call_manager_urls
from case_manager.urls import urlpatterns as case_manager_urls
from location_management.urls import urlpatterns as location_management_urls
from posts_management.urls import urlpatterns as post_management_urls
from reports_management.urls import urlpatterns as reports_management_urls
from user_management.urls import urlpatterns as user_management_urls

urlpatterns = (
    case_manager_urls
    + location_management_urls
    + user_management_urls
    + reports_management_urls
    + post_management_urls
    + call_manager_urls
)
