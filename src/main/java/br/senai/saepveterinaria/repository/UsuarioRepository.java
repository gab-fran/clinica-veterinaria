package br.senai.saepveterinaria.repository;

import br.senai.saepveterinaria.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    List<Usuario> findByStatusUsuarioTrue();
    Optional<Usuario> findByEmailAndStatusUsuarioTrue(String email);
    Optional<Usuario> findByIdUsuarioAndStatusUsuarioTrue(Integer id);
    boolean existsByEmail(String email);
}