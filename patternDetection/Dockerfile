FROM python:3.10.11

WORKDIR /app

# Copy only the requirements file first
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Set the entry point and command
ENTRYPOINT ["python3", "-u"]
CMD ["app.py"]
