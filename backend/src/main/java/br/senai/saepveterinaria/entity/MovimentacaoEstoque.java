package br.senai.saepveterinaria.entity;

import br.senai.saepveterinaria.enums.TipoMovimentacao;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "movimentacao_estoque",
        indexes = {
                @Index(name = "idx_movimentacao_produto", columnList = "id_produto"),
                @Index(name = "idx_movimentacao_usuario", columnList = "id_usuario"),
                @Index(name = "idx_movimentacao_status", columnList = "status_movimentacao")
        }
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovimentacaoEstoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMovimentacaoEstoque;

    @Version
    private Long version;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

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
