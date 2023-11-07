from rest_framework import serializers
from ConectaPucApp.models import Forum
from ConectaPucApp.models import PerfilUsuario
from ConectaPucApp.models import Postagem
from ConectaPucApp.models import Comentario

class ConectaPucSerializer: 
    class ConectaPucForumSerializer(serializers.ModelSerializer):
        class Meta:
            model = Forum # nome do modelo
            fields = '__all__' # lista de campos
    class ConectaPucPerfilUsuarioSerializer(serializers.ModelSerializer):
        class Meta:
            model = PerfilUsuario # nome do modelo
            fields = '__all__' # lista de campos
    class ConectaPucPostagemSerializer(serializers.ModelSerializer):
        class Meta:
            model = Postagem # nome do modelo
            fields = '__all__' # lista de campos
    class ConectaPucComentarioSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comentario # nome do modelo
            fields = '__all__' # lista de campos
        