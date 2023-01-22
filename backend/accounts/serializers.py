from django.contrib.auth import get_user_model

from rest_framework.serializers import ModelSerializer, ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
    
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class NewUserSerializer(ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate(self, data):
        password: str = data['password']

        if len(password) < 6 or len(password) > 12:
            raise ValidationError({'message': 'Password must be in between 6 to 12 characters (inclusive).'})
        
        return data

    def create(self, validated_data):
        email: str = validated_data['email']
        password: str = validated_data['password']

        created_user = self.Meta.model.objects.create_user(email, password)
        created_user.is_active = True

        created_user.save()
        
        return created_user
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email')
        updated_password = validated_data.get('password')
        instance.set_password(updated_password)

        instance.save()

        return instance 