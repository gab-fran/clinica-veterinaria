package br.senai.saepveterinaria.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupMessage implements CommandLineRunner {

    @Value("${server.port:8080}")
    private String port;

    @Override
    public void run(String... args) {
        System.out.println();
        System.out.println("🚀 API SAEP Veterinária iniciada com sucesso!");
        System.out.println("🔗 http://localhost:" + port);
        System.out.println();
    }
}