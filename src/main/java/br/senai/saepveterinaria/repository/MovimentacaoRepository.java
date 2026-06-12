package br.senai.saepveterinaria.repository;

import br.senai.saepveterinaria.entity.MovimentacaoEstoque;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MovimentacaoRepository extends JpaRepository<MovimentacaoEstoque, Integer> {
    List<MovimentacaoEstoque> findByStatusMovimentacaoTrue();
    Optional<MovimentacaoEstoque> findByIdMovimentacaoEstoqueAndStatusMovimentacaoTrue(Integer id);
}