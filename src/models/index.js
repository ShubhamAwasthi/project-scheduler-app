/**
 * Holiday entity
 */
export class Holiday {
  /**
   * creates holiday with given params
   * @param {number} id the id of the Holiday
   * @param {Date} startDate the start date of this holiday
   * @param {Date} endDate the end date of this holiday
   * @param {string} name  the name of this holiday
   */
  constructor(id, startDate, endDate, name) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.name = name;
  }
}

/**
 * Vacation entity
 */
export class Vacation {
  /**
   * creates vacation with given params
   * @param {number} id the id of the Vacation
   * @param {number} workerId the id of the worker
   * @param {Date} startDate the start date of this vacation
   * @param {Date} endDate the end date of this vacation
   */
  constructor(id, workerId, startDate, endDate) {
    this.id = id;
    this.workerId = workerId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

/**
 * WorkItem entity
 */
export class WorkItem {
  /**
   * creates vacation with given params
   * @param {number} id the id of the WorkItem
   * @param {number} taskId the id of the task
   * @param {Date} startDate the start date of this WorkItem
   * @param {Date} endDate the end date of this WorkItem
   */
  constructor(id, taskId, startDate, endDate) {
    this.id = id;
    this.taskId = taskId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

/**
 * Skill entity
 */
export class Skill {
  /**
   * creates  skill with given params
   * @param {string} level level of the skill
   * @param {number} count count of the skill
   */
  constructor(level, count) {
    this.level = level;
    this.count = count;
  }
}

/**
 * Worker entity
 */
export class Worker {
  /**
   * creates a worker with given params
   * @param {number} id the id of the worker
   * @param {string} name the name of this worker
   * @param {Array<Skill>} skills the skill of this worker
   * @param {Array<WorkItem>} workItems optional workItems assigned to this worker
   */
  constructor(id, name, skills, workItems = []) {
    this.id = id;
    this.name = name;
    this.skills = skills;
    this.workItems = workItems;
  }
}

/**
 * Task entity
 */
export class Task {
  /**
   * creates task with given params
   * @param {number} id the id of the task
   * @param {string} name the name of the task
   * @param {Array<Skill>} skills the skills needed for the task
   * @param {number} days the number of days needed to finish the task
   * @param {Array<Worker>} workers the workers assigned to the task
   */
  constructor(id, name, skills, days, workers) {
    this.id = id;
    this.name = name;
    this.skills = skills;
    this.days = days;
    this.workers = workers;
  }
}

/**
 * Project entity
 */
export class Project {
  /**
   * creates a project with given params
   * @param {number} id the id of the project
   * @param {string} name the name of the project
   * @param {Date} startDate the start date of the project
   * @param {Array<Task>} tasks the tasks of the project
   * @param {Array<Worker>} workers the workers of the project
   * @param {Array<Holiday>} holidays the holidays of the project
   * @param {Array<Vacation>} vacations the vacations of the team members in project
   */
  constructor(id, name, startDate, tasks, workers, holidays, vacations) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.tasks = tasks;
    this.workers = workers;
    this.holidays = holidays;
    this.vacations = vacations;
  }
}

/**
 * Profile entity
 */
export class Profile {
  /**
   * creates profile with given params
   * @param {Array<Project>} projects the projects in the profile
   */
  constructor(projects) {
    this.projects = projects;
  }
}
