from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import NewUserSerializer


User = get_user_model()


class UserListView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get(self, request: Request) -> Response:
        all_users = User.objects.all()
        user_serializer = NewUserSerializer(instance=all_users, many=True)

        return Response(data=user_serializer.data, status=status.HTTP_200_OK)

            
class UserDetailView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        try:
            user = User.objects.get(pk=request.user.id)
            user_serializer = NewUserSerializer(instance=user)

            return Response(data=user_serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response(data={'message': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request: Request) -> Response:
        user = User.objects.get(pk=request.user.id)
        user_serializer = NewUserSerializer(instance=user, data=request.data, partial=True)

        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()
            return Response(data={
                'message': f'The credentials of the user with user_id={request.user.id} are updated successfully.',
                'updated_user': user_serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response(data={'message': user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request) -> Response:
        user = User.objects.get(pk=request.user.id)
        user.delete()

        return Response(data={'message': f'User with user_id={request.user.id} successfully deleted.'}, status=status.HTTP_200_OK) 
 
        
class SignupView(APIView):

    def post(self, request: Request) -> Response:
        user_serializer = NewUserSerializer(data=request.data)
        
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response(data={'message': 'User already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()
            return Response(data={'message': 'User created successfully.', 'user': user_serializer.data}, status=status.HTTP_201_CREATED)
        
        return Response(data={'message': user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class BulkDeleteUsersView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request: Request) -> Response:
        users = User.objects.exclude(email='admin@gmail.com')
        users.delete()

        return Response(data={'message': f'All users are deleted successfully.'}, status=status.HTTP_200_OK)
