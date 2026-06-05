package br.senai.saepveterinaria.repository;

import br.senai.saepveterinaria.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    List<Produto> findByStatusProdutoTrue();
    Optional<Produto> findByIdProdutoAndStatusProdutoTrue(Integer id);
}