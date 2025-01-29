FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/arabic_poetry-0.0.1-SNAPSHOT.jar app.jar

COPY backend/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 8080

CMD ["/wait-for-it.sh", "python-api:5000", "--", "java", "-jar", "app.jar"]
