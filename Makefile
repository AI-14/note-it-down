help:
	@echo 'build-frontend   builds the frontend folder'
	@echo 'build-backend    builds the backend folder'
	@echo 'run-frontend     runs the react app'
	@echo 'run-backend      runs the django backend server'

build-frontend:
	cd frontend && npm install 

build-backend:
	cd backend && py -m venv venv && venv\Scripts\activate.bat && pip install -r requirements.txt && python manage.py makemigrations && python manage.py migrate

run-frontend:
	cd frontend && npm start

run-backend:
	cd backend && venv\Scripts\activate.bat && python manage.py runserver


