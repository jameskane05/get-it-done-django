/**
 * Created by cbay on 5/2/15.
 */

function registerTaskEvents(task) {

    // make sure task is a jQuery object
    task = $(task);

    // From a task-name or delete span, retrieve the task ID (since clicks are registered for spans)
    function getTaskRow(spanElt) {
        return spanElt.parentNode.parentNode;
    }

    task.find(".delete").click(function(){

            // store variable in callbacks' closures
            var taskRow = $(getTaskRow(this));

            $.post(
                '/tasks/delete',
                { 'id': taskRow.attr('data-task-id') }
            )
                .done(function(data){

                    // delete the task
                    $(taskRow).remove();
                })
                .fail(function(){
                    console.log(arguments);
                    displayError("Server Error: Unable to delete the task.")
                });
        }
    );

    // Register complete event listener
    task.find(".task-name").click(function(){

            // store variable in callbacks' closures
            var taskRow = $(getTaskRow(this));

            $.post(
                '/tasks/complete',
                { 'id': taskRow.attr('data-task-id') }
            )
                .done(function(data){

                    // complete the task
                    taskRow.appendTo("#gid-completed-list");
                })
                .fail(function(error){
                    displayError("Server Error: Unable to complete the task.", error);
                });
        }
    );
}

function createTask(taskText) {

    $.post(
        '/tasks/new',
        { 'title': taskText }
    )
        .done(function(data){

            var deleteButtonMarkup = '<span class="delete glyphicon glyphicon-remove" aria-hidden="true"></span>';

            // Markup for task item
            var templateStart = "<tr data-task-id='" + this.data.id + "'><td><span class='task-name'>";
            var templateEnd = "</span>" + deleteButtonMarkup + "</td></tr>";

            // Create task element
            var newTask = $(templateStart + taskText + templateEnd);

            registerTaskEvents(newTask);

            // Place task in list
            newTask.appendTo("#gid-list");
        })
        .fail(function(error){
            displayError("Server Error: Unable to create the task.", error);
        });
}

// Universal error display. error may be a string or error object (as via jQuery)
function displayError(msg, error){

    if (error) {
        msg += (typeof error == "string" ? " (" + error + ")" : " (" + error.status + ": " + error.statusText + ")");
        console.log(error);
    }

    $("#error-container").html(
        '<div class="alert alert-error alert-danger">'
        + '<a href="#" class="close" data-dismiss="alert">&times;</a>'
        + '<strong>Error!</strong> ' + msg
    + '</div>'
    );
}

$(document).ready(function(){

    // look for existing tasks and register events
    $("#gid-list tr, #gid-completed-list tr").each(function(idx, task){
        registerTaskEvents(task);
    });

    $("#form-new-task").submit(function(event){

        var input = $("#input-new-task");

        // Get new task and place in list
        createTask(input.val());

        // Clear input and cancel form submission
        input.val("");
        event.preventDefault();
    });
});