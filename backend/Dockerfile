
# Use official Python image
FROM python:3.10

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y libmysqlclient-dev default-libmysqlclient-dev gcc

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Start Gunicorn server
CMD ["gunicorn", "zentask.wsgi:application", "--bind", "0.0.0.0:8000"]
