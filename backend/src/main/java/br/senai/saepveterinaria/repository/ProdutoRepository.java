package br.senai.saepveterinaria.repository;

import br.senai.saepveterinaria.entity.Produto;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    Page<Produto> findByStatusProdutoTrue(Pageable pageable);
    Optional<Produto> findByIdProdutoAndStatusProdutoTrue(Integer id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Produto p where p.idProduto = :id and p.statusProduto = true")
    Optional<Produto> findAtivoForUpdate(@Param("id") Integer id);
}
