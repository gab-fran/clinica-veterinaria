# =========================
# Build Stage
# =========================
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copia arquivos necessários para resolver dependências
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Baixa dependências e aproveita cache

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Copia o código-fonte
COPY src src

# Gera o jar
RUN ./mvnw clean package -DskipTests
RUN ls -la target

# =========================
# Runtime Stage
# =========================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Usuário não-root (mais seguro)
RUN useradd -m spring

COPY --from=build /app/target/saep-veterinaria-0.0.1-SNAPSHOT.jar app.jar

RUN chown spring:spring app.jar

USER spring

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]