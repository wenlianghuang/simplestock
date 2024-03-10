FROM golang:latest

WORKDIR /app

# Copy frontend source code
COPY ./frontend /app/frontend

# Copy backend source code
COPY ./backend /app/backend

# Change directory to frontend
WORKDIR /app/frontend

# Install frontend dependencies and build
RUN apt-get update && apt-get install -y npm && npm install && npm run build

# Change directory to backend
WORKDIR /app/backend

# Download backend dependencies
RUN go mod download

# Build the backend application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Expose port
EXPOSE 7050

# Command to run the backend application
CMD ["./main"]