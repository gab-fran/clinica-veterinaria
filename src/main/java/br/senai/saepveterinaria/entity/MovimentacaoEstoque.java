package br.senai.saepveterinaria.entity;

import br.senai.saepveterinaria.enums.TipoMovimentacao;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dataCriacaoMovimentacao;

    @UpdateTimestamp
    private LocalDateTime dataAtualizacaoMovimentacao;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean statusMovimentacao = true;
}