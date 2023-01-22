from rest_framework.request import Request
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

import uuid

from .serializers import NotesSerializer
from .models import Notes


class NotesListView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        priority = request.query_params.get('priority')
        if priority:
            notes = Notes.objects.filter(user=request.user.id, priority=priority)
            total_notes = Notes.objects.filter(user=request.user.id, priority=priority).count()
        else:
            notes = Notes.objects.filter(user=request.user.id)
            total_notes = Notes.objects.filter(user=request.user.id).count()
            
        notes_serializer = NotesSerializer(instance=notes, many=True)

        return Response(data={'total_notes': total_notes, 'notes': notes_serializer.data}, status=status.HTTP_200_OK)


class NotesPostView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        request.data['user'] = str(request.user.id)

        notes_serializer = NotesSerializer(data=request.data)

        if notes_serializer.is_valid():
            notes_serializer.save()
            return Response(data={'message': f'Note created successfully for user_id={request.user.id}.', 'note': notes_serializer.data}, status=status.HTTP_201_CREATED)
        
        return Response(data={'message': notes_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

class NotesDetailView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, note_id: uuid) -> Response:
        try:
            note = Notes.objects.get(id=note_id)
            notes_serializer = NotesSerializer(instance=note)
            return Response(data={'note': notes_serializer.data}, status=status.HTTP_200_OK)

        except Notes.DoesNotExist:
            return Response(data={'message': f'Note with note_id={note_id} does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request: Request, note_id: uuid) -> Response:
        try:
            request.data['user'] = str(request.user.id)
            note = Notes.objects.get(id=note_id)
            note_serializer = NotesSerializer(instance=note, data=request.data, partial=True)
    
            if note_serializer.is_valid(raise_exception=True):
                note_serializer.save()
                return Response(data={
                    'message': f'Note with note_id={note_id} is updated successfully for the user_id={request.user.id}.',
                    'updated_note': note_serializer.data
                }, status=status.HTTP_200_OK)

        except Notes.DoesNotExist:
            return Response(data={'message': f'Note with note_id={note_id} does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(data={'message': note_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, note_id: uuid) -> Response:
        try:
            note = Notes.objects.get(id=note_id)
            note.delete()

            return Response(data={'message': f'Note with note_id={note_id} is deleted successfully for the user_id={request.user.id}.'
            }, status=status.HTTP_200_OK)
            
        except Notes.DoesNotExist:
            return Response(data={'message': f'Note with note_id={note_id} does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    

class NotesBulkDeleteView(APIView):
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request: Request) -> Response:
        notes = Notes.objects.filter(user=request.user.id)
        notes.delete()

        return Response(data={'message': f'All notes are deleted successfully for the user_id={request.user.id}.'}, status=status.HTTP_200_OK)
        