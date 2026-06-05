package br.senai.saepveterinaria.entity;

import br.senai.saepveterinaria.enums.TipoMovimentacao;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "movimentacaoEstoque")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovimentacaoEstoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMovimentacaoEstoque;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto idProduto;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario idUsuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoMovimentacao tipoMovimentacao;

    @Min(1)
    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private LocalDate dataMovimentacao;
}