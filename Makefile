help:
	@echo 'build-backend    builds the backend folder'
	@echo 'build-frontend   builds the frontend folder'
	@echo 'run-backend      runs the django backend server'
	@echo 'run-frontend     runs the react app'
	@echo 'createsuperuser  prompts to create a super-user in django'

build-backend:
	cd backend && py -m venv venv && venv\Scripts\activate.bat && pip install -r requirements.txt && python manage.py makemigrations && python manage.py migrate

build-frontend:
	cd frontend && npm install 

run-backend:
	cd backend && venv\Scripts\activate.bat && python manage.py runserver

run-frontend:
	cd frontend && npm start

createsuperuser:
	cd backend && venv\Scripts\activate.bat && python manage.py createsuperuser