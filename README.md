![node build](https://github.com/ShubhamAwasthi/project-scheduler-app/actions/workflows/node.js.yml/badge.svg)

## Introduction

This application helps the users to estimate the schedule for a project. The users input project details such as below.

- Project name and start date
- Task name and high/medium/low skill worker count
- Team member name and skill level
- Company / Public holidays start and end date
- Team member vacations

Once we save the above information. The app tries to come up with a schedule for the task assigning the team members as efficiently as possible. The task list order users input is the priority i.e. first entered task will be assigned first with the assignee team member.

The generated schedule can be exported via csv export to allow sharing the schedule with stakeholders.

## [Demo recording](./docs/projectSchedulerAppDemo.gif)

## ![](./docs/projectSchedulerAppDemo.gif)

### The app is also hosted on github pages at [https://shubhamawasthi.github.io/project-scheduler-app/](https://shubhamawasthi.github.io/project-scheduler-app/)

## Developer setup

```sh
git clone https://github.com/ShubhamAwasthi/project-scheduler-app.git
npm install
npm run start
```

Additionally if you have forked the project you can run below commands to push your changes to your github pages after modifying below line in package.json with your git repository details

`"homepage": "https://shubhamawasthi.github.io/project-scheduler-app/"`

```sh
git commit -m "commit message"
git push origin master
npm run deploy
```
