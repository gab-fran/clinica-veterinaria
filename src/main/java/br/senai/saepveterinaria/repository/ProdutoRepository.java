package br.senai.saepveterinaria.repository;

import br.senai.saepveterinaria.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
}