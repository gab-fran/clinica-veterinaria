package br.senai.saepveterinaria.repository;

import br.senai.saepveterinaria.entity.MovimentacaoEstoque;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MovimentacaoRepository extends JpaRepository<MovimentacaoEstoque, Integer> {
    @EntityGraph(attributePaths = {"produto", "usuario"})
    Page<MovimentacaoEstoque> findByStatusMovimentacaoTrue(Pageable pageable);

    @EntityGraph(attributePaths = {"produto", "usuario"})
    Optional<MovimentacaoEstoque> findByIdMovimentacaoEstoqueAndStatusMovimentacaoTrue(Integer id);
}
