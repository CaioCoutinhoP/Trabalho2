from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
# Autenticação
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth import login
# Swagger
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from Contas.serializers import CreateUserSerializer, UserSerializer
from rest_framework.views import APIView


class CreateUserView(APIView):
    @swagger_auto_schema(
        operation_summary='Criar um novo usuário',
        operation_description='Retorna o token em caso de sucesso na criação do usuário',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING),
                'password': openapi.Schema(type=openapi.TYPE_STRING),
                'email': openapi.Schema(type=openapi.TYPE_STRING),
                # Adicione outros campos necessários para a criação do usuário
            },
            required=['username', 'password', 'email'],
        ),
        responses={
            status.HTTP_201_CREATED: 'Usuário criado com sucesso.',
            status.HTTP_400_BAD_REQUEST: 'Erro na requisição.',
        },
    )
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # uma boa prática é retornar o próprio objeto a
            return Response(serializer.data,
            status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,
                            status.HTTP_400_BAD_REQUEST)  


class CustomAuthToken(ObtainAuthToken):
    '''
    view para gerenciamento de tokens de autenticação
    '''
    @swagger_auto_schema(
        operation_summary='Obter o token de autenticação',
        operation_description='Retorna o token em caso de sucesso na autenticação ou HTTP 401',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username' : openapi.Schema(type=openapi.TYPE_STRING),
                'password' : openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['username', 'password', ],

        ),
        responses={
            status.HTTP_200_OK: 'Token is returned.',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized request.',
        },
    )

    def get(self, request):
        """
        Parâmetros: o token de acesso
        Retorna: o username ou 'visitante'
        """
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1] #token
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
            return Response(
                {'username' : user.username},
                status=status.HTTP_200_OK
            )
        except (Token.DoesNotExist, AttributeError):
            return Response(
                {'username': 'visitante'},
                status=status.HTTP_404_NOT_FOUND
            )


    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, contrext={'request': request})
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                login(request, user)
                return Response({'token': token.key})
            return Response(status=status.HTTP_401_UNAUTHORIZED)
       
    



