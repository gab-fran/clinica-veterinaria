package br.senai.saepveterinaria.repository;

import br.senai.saepveterinaria.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
}