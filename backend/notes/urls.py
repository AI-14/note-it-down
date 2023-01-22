from django.urls import path

from .views import NotesListView, NotesPostView, NotesDetailView, NotesBulkDeleteView


urlpatterns = [
    path('all/', NotesListView.as_view()),
    path('note/', NotesPostView.as_view()),
    path('note/<uuid:note_id>', NotesDetailView.as_view()),
    path('bulkdelete/', NotesBulkDeleteView.as_view())
]

