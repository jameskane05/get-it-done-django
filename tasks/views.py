from django.shortcuts import render
from django.http import JsonResponse
from .models import Task
from django.views.decorators.csrf import csrf_exempt

def index(request):
    tasks = Task.objects.all()
    return render(request, "tasks/index.html", { 'tasks': tasks })

@csrf_exempt
def create_task(request):

    title = request.POST.get('title')
    task = Task.objects.create(title=title)

    return JsonResponse({ 'id': task.id, 'title': task.title, 'completed': task.completed, 'created': task.created})

@csrf_exempt
def complete_task(request):
    id = getTaskIdFromRequest(request)
    task = Task.objects.get(id=id)
    task.completed = True
    task.save()
    return JsonResponse({ 'id': task.id, 'title': task.title, 'completed': task.completed, 'created': task.created})

@csrf_exempt
def delete_task(request):
    id = getTaskIdFromRequest(request)
    task = Task.objects.get(id=id)
    task.delete()
    return JsonResponse({'id': task.id, 'deleted': True})

# Isolate this logic for easy refactoring
def getTaskIdFromRequest(request):
    if request.method == 'POST':
        return int(request.POST.get("id"))
    else:
        return None