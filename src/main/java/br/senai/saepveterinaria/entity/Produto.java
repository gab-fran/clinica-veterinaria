package br.senai.saepveterinaria.entity;


import br.senai.saepveterinaria.enums.TipoProduto;
import br.senai.saepveterinaria.enums.UnidadeMedida;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "produto")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProduto;

    @NotBlank(message = "O nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "A marca é obrigatória")
    @Column(nullable = false, length = 100)
    private String marca;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoProduto tipo;

    @Min(value = 0, message = "A quantidade não pode ser negativa")
    @Column(nullable = false)
    private Integer quantidadeEstoque;

    @Min(value = 0, message = "O estoque mínimo não pode ser negativo")
    @Column(nullable = false)
    private Integer estoqueMinimo;

    private LocalDate validade;

    @Column(columnDefinition = "decimal(10, 2)")
    private Double pesoKg;

    @Column(columnDefinition = "decimal(10, 2)")
    private Double dosagem;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private UnidadeMedida unidadeMedida;

//    @OneToMany(mappedBy = "produto")
//    private List<MovimentacaoEstoque> movimentacoes;
}