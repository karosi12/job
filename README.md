# Job offer

A simple job requirement API documentation written with nestjs framework using Nx workspace

##

API Base Endpoint:https://joboffer12.herokuapp.com/api

# Technologies Used

- Backend: Node/Nestjs
- Nx monorepos

# Features
- As a user I need to be able to query existing job offers as a list.
- As a user I need to be able to query details of a single job offer.
- As a user I need to be able to create new job offers.
- As a user I need to be able to update existing job offers.
- As a user I need to be able to remove existing job offers.

## API Endpoints

| Endpoint                                   | Functionality           |
| ------------------------------------------ | -----------------------             |
| POST /api/jobs/                            | create a job       |
| GET /api/jobs/\<job_id>                   | Find a job           |
| GET /api/jobs                  | Find jobs           |
| PATCH /api/jobs/\<job_id>                 | update a job     |
| DELETE /api/jobs/\<job_id>                | delete a job     |


[Job offer](https://documenter.getpostman.com/view/10646382/UUy396NU)

# To Install

- Download or clone
- Open terminal inside the root directory of clone folder
- Type `npm install` to install all dependencies
- `nx start` to run the app
- `nx build` to run build app
- `npm test` to run the test suits on the app

API Endpoint: https://documenter.getpostman.com/view/10646382/UUy396NU

## AUTHOR

[Kayode Adeyemi](https://github.com/karosi12)
