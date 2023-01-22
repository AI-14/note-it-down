from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .serializers import MyTokenObtainPairView
from .views import UserListView, UserDetailView, SignupView, BulkDeleteUsersView


urlpatterns = [
    path('all/', UserListView.as_view()),
    path('user/', UserDetailView.as_view()),
    path('user/signup/', SignupView.as_view()),
    path('user/login/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/login/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('bulkdelete/', BulkDeleteUsersView.as_view())
]

