from django.http import Http404
from ConectaPucApp.serializers import ConectaPucSerializer
from rest_framework.views import APIView
from .models import Postagem, Forum, Comentario
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.autor == request.user
class IsAdminUserOrReadOnly(permissions.BasePermission): # Classe para permissao de adm
    def has_permission(self, request, view):
        # Apenas administradores podem criar fóruns
        if request.method == 'POST' and not request.user.is_staff:
            return False
        return True
    
class ForumListView(APIView):#Mostrar forum
    def get(self, request):
        forums = Forum.objects.all().order_by('nome')
        serializer = ConectaPucSerializer.ConectaPucForumSerializer(forums, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
class ForumUpdateView(APIView):
    permission_classes = [IsAdminUserOrReadOnly]

    def put(self, request, pk):
        forum = self.get_forum(pk)

        serializer = ConectaPucSerializer.ConectaPucForumSerializer(forum, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_forum(self, pk):
        try:
            return Forum.objects.get(pk=pk)
        except Forum.DoesNotExist:
            raise Http404
class ForumCreateView(APIView):#Criar forum
    permission_classes = [IsAdminUserOrReadOnly]
    def post(self, request):
        serializer = ConectaPucSerializer.ConectaPucForumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ForumDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]
    def delete(self, request):
        id_erro = ""
        erro = False
        for forum_id in request.data:
            try:
                forum = Forum.objects.get(id=forum_id)
                forum.delete()
            except Forum.DoesNotExist:
                id_erro += str(forum_id)
                erro = True

        if erro:
            return Response({'error': f'Fórum(s) com ID(s) [{id_erro}] não encontrado(s)'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

class PostagemListView(APIView):#Ver postagem
    def get(self, request):
        postagens = Postagem.objects.all().order_by('data_postagem')
        serializer = ConectaPucSerializer.ConectaPucPostagemSerializer(postagens, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PostagemCreateView(APIView):
    def post(self, request): #Adiciona postagem
        serializer = ConectaPucSerializer.ConectaPucForumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostagemUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        postagem = self.get_postagem(pk)
        
        # Verifique se o usuário é o autor da postagem
        if postagem.autor != request.user:
            return Response({"detail": "Você não tem permissão para atualizar esta postagem."}, status=status.HTTP_403_FORBIDDEN)

        serializer = ConectaPucSerializer.ConectaPucPostagemSerializer(postagem, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_postagem(self, pk):
        try:
            return Postagem.objects.get(pk=pk)
        except Postagem.DoesNotExist:
            raise Http404
        
class PostagemDeleteView(APIView):
    authentication_classes = [TokenAuthentication]  # Use Token Authentication (ou outra autenticação de sua escolha)
    permission_classes = [IsAuthenticated]  # Apenas usuários autenticados podem acessar a visualização

    def delete(self, request):
        id_erro = ""
        erro = False
        for postagem_id in request.data:
            try:
                postagem = Postagem.objects.get(id=postagem_id)

                # Verifique se o usuário atual é o autor da postagem
                if postagem.autor != request.user:
                    return Response({'error': 'Você não tem permissão para excluir esta postagem.'}, status=status.HTTP_403_FORBIDDEN)

                postagem.delete()
            except Postagem.DoesNotExist:
                id_erro += str(postagem_id)
                erro = True

        if erro:
            return Response({'error': f'Postagem(s) com ID(s) [{id_erro}] não encontrado(s)'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    
class ComentarioListView(APIView): #Lista comentarios
    def get(self, request, postagem_id):
        comentarios = Comentario.objects.filter(postagem__id=postagem_id).order_by('data_criacao')
        serializer = ConectaPucSerializer.ConectaPucComentarioSerializer(comentarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ComentarioCreateView(APIView): #cria comentarios
    def post(self, request):
        serializer = ConectaPucSerializer.ConectaPucComentarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ComentarioUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        comentario = self.get_comentario(pk)
        
        # Verifique se o usuário é o autor do comentário
        if comentario.autor != request.user:
            return Response({"detail": "Você não tem permissão para atualizar este comentário."}, status=status.HTTP_403_FORBIDDEN)

        serializer = ConectaPucSerializer.ConectaPucComentarioSerializer(comentario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_comentario(self, pk):
        try:
            return Comentario.objects.get(pk=pk)
        except Comentario.DoesNotExist:
            raise Http404
class ComentarioDeleteView(APIView):
    authentication_classes = [TokenAuthentication]  # Use Token Authentication
    permission_classes = [IsAuthenticated]  # Apenas usuários autenticados podem acessar a visualização

    def delete(self, request):
        id_erro = ""
        erro = False
        for comentario_id in request.data:
            try:
                comentario = Comentario.objects.get(id=comentario_id)

                # Verifique se o usuário atual é o autor do comentário
                if comentario.autor != request.user:
                    return Response({'error': 'Você não tem permissão para excluir este comentário.'}, status=status.HTTP_403_FORBIDDEN)

                comentario.delete()
            except Comentario.DoesNotExist:
                id_erro += str(comentario_id)
                erro = True

        if erro:
            return Response({'error': f'Comentário(s) com ID(s) [{id_erro}] não encontrado(s)'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    
