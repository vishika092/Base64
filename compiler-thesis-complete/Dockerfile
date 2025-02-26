# Use Ubuntu as the base image (lightweight and supports all tools)
FROM ubuntu:latest

# Set the working directory
WORKDIR /app

# Update package list
RUN apt-get update

# Install Node.js (LTS version)
RUN apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install Python
RUN apt-get install -y python3 python3-pip

# Install Java (OpenJDK 21)
RUN apt-get install -y openjdk-21-jdk

# Install Bash (already included in Ubuntu, but ensuring it's installed)
RUN apt-get update && apt-get install -y bash dash
RUN  apt install -y time


# Install GCC (C/C++ Compiler)
RUN apt-get install -y gcc g++

# Install Ruby
RUN apt-get install -y ruby-full

# Verify installations
RUN node -v && npm -v && python3 --version && java -version && gcc --version && g++ --version && ruby --version && bash --version

# Copy package.json and install dependencies
COPY package.json /app
RUN npm install

# Copy the rest of the files
COPY . /app

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
