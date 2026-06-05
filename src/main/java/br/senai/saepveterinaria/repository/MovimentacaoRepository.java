package br.senai.saepveterinaria.repository;

import br.senai.saepveterinaria.entity.MovimentacaoEstoque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimentacaoRepository extends JpaRepository<MovimentacaoEstoque, Integer> {
}