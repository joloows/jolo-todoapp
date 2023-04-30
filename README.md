# Jolo's Todo App

A simple To-do web app made with Django.

## Features

* User authentication
* Add task to a todo list
* Add, update, and delete todos and tasks
* Update user profile image

# Requirements

* python 3.9+
* virtualenv

# Installation

1. Clone the repository
``` bat
git clone https://github.com/joloows/jolo-todoapp.git
cd jolo-todoapp
```
2. Create and activate the virtual environment
``` bat
virtualenv venv
./venv/Scripts/activate
```
3. Install the dependencies
``` bat
pip install -r requirements.txt
```

4. Create a ```.env```  file in ```\src``` folder and write the following:
``` bat
SECRET_KEY=<YOUR SECRET KEY HERE>
DEBUG=True
```
&nbsp;&nbsp;&nbsp;You can generate ```SECRET_KEY``` by running the following in the terminal:
``` bat
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```
&nbsp;&nbsp;&nbsp;Simply replace ```<YOUR SECRET KEY HERE>``` in the ```.env``` file with the key generated.

5. Migrate and run the app
``` bat
python manage.py migrate
python manage.py runserver
```
Visit http://127.0.0.1:8000/ or http://localhost:8000/ for the running web server.
