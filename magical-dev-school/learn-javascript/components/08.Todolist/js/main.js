//Constants
const ROOT_ENDPOINT = "https://api.learnjavascript.today";
const encoded = btoa("eyub_s_js:1234567");
const TASK_STATE = {
  LOADING: "loading",
  LOADED: "loaded",
};

// DOM elements
const todolistForm = document.querySelector(".todolist");
const tasksContainer = todolistForm.querySelector(".todolist__tasks");
const emptyStateDiv = todolistForm.querySelector(".todolist__empty-state");
const submitButton = todolistForm.querySelector("button[type='submit']");
const errorContainer = document.querySelector(".flash-container");
const textField = todolistForm.querySelector("input[type='text']");

// state
const state = {
  tasks: [],
};

// ============================================================================
// Utility Functions
// ============================================================================

function generateRandomId(length) {
  return "A" + Math.random.toString(36).substring(2, 2 + length);
}

function debounce(func, delay = 300) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function render() {
  tasksContainer.innerHTML = "";

  if (state.tasks.length === 0) {
    emptyStateDiv.textContent = "You don't have any tasks";
  }

  state.tasks.forEach((task) => {
    const taskElem = createTaskElem(task);
    tasksContainer.appendChild(taskElem);
  });
}

/**
 * Checks if the primary command key (Cmd on Mac, Ctrl on Windows/Linux) is pressed.
 * This function is cross-browser compatible, prioritizing the modern `navigator.userAgentData`
 * API and falling back to the deprecated `navigator.platform`.
 * @param {KeyboardEvent} event The keyboard event.
 * @returns {boolean} True if the command key is pressed.
 */
function isCommandKeyPressed(event) {
  // The modern API (navigator.userAgentData) is available in Chromium-based browsers.
  // The 'platform' property returns a string like "macOS", "Windows", or "Linux".
  const isMac = navigator.userAgentData
    ? navigator.userAgentData.platform === "macOS"
    : // For Firefox, Safari, and other browsers, we fall back to the deprecated
      // but widely supported navigator.platform.
      navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  // On Mac, the command key is `metaKey`. On all other platforms, `ctrlKey`
  // is the standard for web application shortcuts.
  return isMac ? event.metaKey : event.ctrlKey;
}

// ============================================================================
// Connection Status
// ============================================================================

function updateConnectionStatus() {
  function setConntectionStatus() {
    navigator.onLine
      ? (document.body.dataset.connectionStatus = "online")
      : (document.body.dataset.connectionStatus = "offline");
  }
  setConntectionStatus();
  window.addEventListener("online", setConntectionStatus);
  window.addEventListener("offline", setConntectionStatus);
}

updateConnectionStatus();

// ============================================================================
// API Layer
// ============================================================================

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${ROOT_ENDPOINT}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Basic ${encoded}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

const api = {
  async createUser(username, password) {
    return apiRequest(`/users`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
  },

  async getUser(username) {
    const response = apiRequest(`/users/${username}`);
    console.log(response.json());
  },

  async getTasks() {
    return apiRequest("/tasks");
  },

  async createTask(taskName) {
    return apiRequest("/tasks", {
      method: "POST",
      body: JSON.stringify({
        name: taskName,
        state: TASK_STATE.LOADED,
      }),
    });
  },

  async updateTask(taskId, updates) {
    return apiRequest(`/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  },

  async deleteTask(taskId) {
    return apiRequest(`/tasks/${taskId}`, {
      method: "DELETE",
    });
  },
};

// ============================================================================
// State Management
// ============================================================================

const stateManger = {
  setTasks(tasks) {
    state.tasks = tasks;
  },

  addTask(task) {
    state.tasks.push(task);
  },

  updateTask(taskId, updates) {
    const index = state.tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      state.tasks[index] = { ...state.tasks[index], ...updates };
    }
  },

  deleteTask(taskId) {
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
  },

  getTaskById(id) {
    const taskIndex = state.tasks.findIndex((task) => task.id === id);
    return state.tasks[taskIndex];
  },

  getTaskIndexById(id) {
    return state.tasks.findIndex((task) => task.id === id);
  },

  insertTask(taskIndex, taskToInsert) {
    state.tasks.splice(taskIndex, 0, taskToInsert);
  },
};

// ============================================================================
// UI Functions
// ============================================================================

function createTaskElem(task) {
  const { id, name, done, state = TASK_STATE.LOADED } = task;
  const taskContainer = document.createElement("li");
  taskContainer.classList.add("task");
  taskContainer.setAttribute("tabindex", "-1");
  const spinner =
    state === TASK_STATE.LOADING
      ? '<img class="task__spinner" src="images/spinner.gif" alt=""/>'
      : "";

  let checkbox =
    state === TASK_STATE.LOADED
      ? `<input type="checkbox" id=${id} ${done && "checked"} />`
      : "";

  taskContainer.innerHTML = `
    ${spinner}
    ${checkbox}
      <label for=${id}>
        <svg viewBox="0 0 20 15">
          <path d="M0 8l2-2 5 5L18 0l2 2L7 15z" fill-rule="nonzero" />
        </svg>
      </label>
      <span class="task__name">${name}</span>
      <button type="button" class="task__delete-button">
          <svg viewBox="0 0 20 20">
                <path
                  d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                />
            </svg>
      </button>
    `;

  return taskContainer;
}

function createError(errorMessage) {
  const flashDiv = document.createElement("div");
  flashDiv.classList.add("flash");
  flashDiv.setAttribute("data-type", "error");
  flashDiv.innerHTML = `
    <svg class="flash__icon" viewBox="0 0 20 20">
      <path
        class="flash__exclaim-border"
        d="M3.053 17.193A10 10 0 1 1 16.947 2.807 10 10 0 0 1 3.053 17.193zm12.604-1.536A8 8 0 1 0 4.343 4.343a8 8 0 0 0 11.314 11.314z"
        fill-rule="nonzero"
      />
      <path
        class="flash__exclaim-mark"
        d="M9 5h2v6H9V5zm0 8h2v2H9v-2z"
        fill-rule="nonzero"
      />
    </svg>
    <span class="flash__message">${errorMessage}</span>
    <button class="flash__close">
      <svg viewBox="0 0 20 20">
        <path
          d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
        />
      </svg>
    </button>
    `;

  errorContainer.appendChild(flashDiv);
}

function handleError(error) {
  let errorMessage = error.message;

  if (errorMessage === "Unauthorized") {
    errorMessage =
      "Invalid username or password. Plese check your username or password";
  } else if (errorMessage === "TypeError: Failed to fetch") {
    errorMessage = "Failed to reach server. Plese try again later";
  }

  createError(errorMessage);
}

function manegeButtonState(state) {
  if (state === TASK_STATE.LOADING) {
    submitButton.textContent = "creating task...";
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.removeAttribute("disabled");
    submitButton.textContent = "add task";
  }
}
// ============================================================================
// Task Operations
// ============================================================================

async function handleCreateTask(textFieldValue) {
  const tempTask = {
    id: generateRandomId(10),
    done: false,
    name: textFieldValue,
    state: "loading",
  };

  stateManger.addTask(tempTask);
  render();

  manegeButtonState(TASK_STATE.LOADING);
  try {
    const newTask = await api.createTask(textFieldValue);
    const { id, name, done, state } = newTask;

    stateManger.updateTask(tempTask.id, { id, name, done, state });
    render();

    textField.value = "";
    textField.focus;
  } catch (error) {
    handleError(error);
    stateManger.deleteTask(tempTask.id);
    render();
  } finally {
    manegeButtonState(TASK_STATE.LOADED);
  }
}

async function handleToggleTask(checkbox) {
  const { id, checked } = checkbox;

  try {
    const updatedTask = await api.updateTask(id, {
      done: checkbox.checked,
    });
    stateManger.updateTask(id, updatedTask);
  } catch (error) {
    checkbox.checked = !checked;
    createError(error);
  }
}

async function handleDeleteTask(deleteButton) {
  const taskContainer = deleteButton.parentElement;
  const taskId = taskContainer.querySelector("input[type='checkbox']").id;
  const taskIndex = stateManger.getTaskIndexById(taskId);
  const originalTask = stateManger.getTaskById(taskId);

  try {
    stateManger.deleteTask(taskId);
    render();
    await api.deleteTask(taskId);
  } catch (error) {
    stateManger.insertTask(taskIndex, originalTask);
    render();
    handleError(error);
  }
}

async function handleEditTaskName(target) {
  const span = target;
  const task = span.closest(".task");
  const id = task.querySelector("input[type='checkbox']").id;

  const originalTask = stateManger.getTaskById(id);

  const oldTextContent = span.textContent;
  const newTaskNameInput = document.createElement("input");
  newTaskNameInput.classList.add("task__name");
  newTaskNameInput.value = originalTask.name;

  task.insertBefore(newTaskNameInput, span);
  newTaskNameInput.focus();

  span.textContent = "";

  async function saveNewTaskName() {
    newTaskNameInput.removeEventListener("input", saveNewTaskName);
    newTaskNameInput.blur();
    task.removeChild(newTaskNameInput);

    const newName = DOMPurify.sanitize(newTaskNameInput.value.trim());

    if (newName === oldTextContent) return;
    stateManger.updateTask(id, { name: newName });
    render();
    try {
      await api.updateTask(id, { name: newName });
    } catch (error) {
      handleError(error);
      stateManger.updateTask(id, { name: originalTask.name });
      render();
    }
  }

  const debounceSave = debounce(saveNewTaskName, 300);

  newTaskNameInput.addEventListener("input", debounceSave);
}

// ============================================================================
// Event Listeners
// ============================================================================

todolistForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const textFieldValue = DOMPurify.sanitize(textField.value.trim());
  if (!textFieldValue) return;

  await handleCreateTask(textFieldValue);
});

tasksContainer.addEventListener("change", async (event) => {
  if (!event.target.matches("input[type='checkbox']")) return;

  await handleToggleTask(event.target);
});

tasksContainer.addEventListener("click", async (event) => {
  const target = event.target;

  if (target.matches(".task__delete-button")) {
    await handleDeleteTask(target);
  }

  if (target.matches("span")) {
    await handleEditTaskName(target);
  }
});

errorContainer.addEventListener("click", (event) => {
  if (!event.target.matches(".flash__close")) return;
  const closeButton = event.target;
  const flashDiv = closeButton.parentElement;
  errorContainer.removeChild(flashDiv);
});

document.addEventListener("keydown", (event) => {
  const { key } = event;
  if (key !== "ArrowUp" && key !== "ArrowDown") return;

  const tasks = [...tasksContainer.children];

  if (!event.target.closest(".task")) {
    if (key === "ArrowDown") {
      return tasks[0].focus();
    }

    if (key === "ArrowUp") {
      return tasks[tasks.length - 1].focus();
    }
  }

  if (document.activeElement.closest(".task")) {
    const taskIndex = tasks.findIndex(
      (task) => task === document.activeElement,
    );

    if (key === "ArrowUp" && tasks[taskIndex] === tasks[0]) {
      return tasks[tasks.length - 1].focus();
    }

    if (key === "ArrowDown" && tasks[taskIndex] === tasks[tasks.length - 1]) {
      return tasks[0].focus();
    }

    if (key === "ArrowDown") {
      return tasks[taskIndex + 1].focus();
    }

    if (key === "ArrowUp") {
      return tasks[taskIndex - 1].focus();
    }
  }
});

tasksContainer.addEventListener("keydown", (event) => {
  if (isCommandKeyPressed(event) && event.key === "Enter") {
    const task = event.target.closest(".task");
    const checkbox = task.querySelector("input[type='checkbox']");
    checkbox.click();
  }
});

tasksContainer.addEventListener("keydown", (event) => {
  function deleteTask(event) {
    const task = event.target.closest(".task");
    const deleteButton = task.querySelector(".task__delete-button");
    console.log(deleteButton);
    deleteButton.click();
  }

  if (
    (isCommandKeyPressed(event) && event.key === "Backspace") ||
    event.key === "Delete"
  ) {
    return deleteTask(event);
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key !== "n") return;
  if (event.target.matches("input[type='text']")) return;

  event.preventDefault();
  textField.focus();
  textField.value = "";
});

// ============================================================================
// Initialization
// ============================================================================

async function init() {
  const tasks = await api.getTasks();
  stateManger.setTasks(tasks);

  render();
}

init();
