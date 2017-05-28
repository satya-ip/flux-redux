import { generate as id } from 'shortid';
import { Dispatcher, ReduceStore } from './flux';

const taskDispatcher = new Dispatcher();

const CREATE_TASK = 'CREATE_TASK';
const COMPLETE_TASK = 'COMPLETE_TASK';
const SHOW_TASK = 'SHOW_TASK';

const createNewTaskAction = (content) => {
    return {
      type: CREATE_TASK,
      value: content
    }
}

const showTaskAction = (content) => {
    return {
      type: SHOW_TASK,
      value: content
    }
}

const completeTaskAction = (id, isComplete) => {
    return {
      type: COMPLETE_TASK,
      id,
      value: isComplete
    }
}

class TasksStore extends ReduceStore{
  getInitialState(){
    return {
        tasks: [{
          id: id(),
          content: "Update CSS Styles and create CSS library",
          complete: false
        },{
          id: id(),
          content: "Build automation tests",
          complete: false
        },{
          id: id(),
          content: "Post to social media",
          complete: false
        },{
          id: id(),
          content: "Install hard drive",
          complete: false
        }],
        showComplete : true
    }

  }

  reduce(state, action) {
    console.log("Reducing...", state, action);
    return state;
  }

  getState(){
    return this.__state;
  }
}

const TaskComponent = ({content, complete, id}) => {
  `<section>
    ${content} <input type="checkbox" name="taskCompleteCheck" data-taskid=${id} ${complete ? "checked" : ""}>
  </section>`
}

const render = () => {
  const tasksSection = document.getElementById('tasks');
  const state = tasksStore.getState();
  const rendered = state.tasks
    .filter(task => state.showComplete ? true : !task.complete)
    .map(TaskComponent).join("");

  tasksSection.innerHTML = rendered;
}

const tasksStore = new TasksStore(taskDispatcher);
taskDispatcher.dispatch('TEST_DISPATCH');
render();
