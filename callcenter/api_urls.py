from case_manager.urls import urlpatterns as case_manager_urls
from location_management.urls import urlpatterns as location_management_urls
from user_management.urls import urlpatterns as user_management_urls

urlpatterns = case_manager_urls + location_management_urls + user_management_urls