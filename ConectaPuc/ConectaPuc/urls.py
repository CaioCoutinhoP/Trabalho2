"""
URL configuration for ConectaPuc project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ConectaPucApp import views



urlpatterns = [
    #path('admin/', admin.site.urls),
    path('api/forums/create/', views.ForumCreateView.as_view(), name='forum-create'),
    path('api/forums/', views.ForumListView.as_view(), name='forum-list'),
    path('api/foruns/update/<int:pk>/', views.ForumUpdateView.as_view(), name='forum-update'),
    path('api/forums/delete/', views.ForumDeleteView.as_view(), name='forum-delete'),
    ###############
    path('api/postagens/create/', views.PostagemCreateView.as_view(), name='postagem-create'),
    path('api/postagens/', views.PostagemListView.as_view(), name='postagem-list'),
    path('api/postagens/update/<int:pk>/', views.PostagemUpdateView.as_view(), name='postagem-update'),
    path('api/postagens/delete/', views.PostagemDeleteView.as_view(), name='postagem-delete'),
    ###############
    path('api/comentarios/create/', views.ComentarioCreateView.as_view(), name='comentario-create'),
    path('api/postagens/<int:postagem_id>/comentarios/', views.ComentarioListView.as_view(), name='comentario-list'),
    path('api/comentarios/update/<int:pk>/', views.ComentarioUpdateView.as_view(), name='comentario-update'),
    path('api/comentarios/delete/', views.ComentarioDeleteView.as_view(), name='comentario-delete'),
    ###############
]
