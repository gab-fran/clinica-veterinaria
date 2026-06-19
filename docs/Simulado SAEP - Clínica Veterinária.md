

Sistema de Avaliação da Educação Profissional - SAEP

SENAI – PELO FUTURO DO TRABALHO  Escola SENAI "Ettore Zanni"
Curso:  Técnico em Desenvolvimento de Sistemas  Turma:  T2DSI-3
Avaliação Prática de Desempenho dos Estudantes
## Estudante:  ______________________________________________________________
## CPF:  __________________________
## Avaliador:  _______________________________________________________________
Caderno de Prova do Estudante
## 1. Orientações Gerais
Desligue e guarde o seu dispositivo inteligente (smartphone, smartwatch ou qualquer
dispositivo com acesso a internet).  Proibido o uso de internet.  Antes de iniciar a prova,
leia atentamente as instruções contidas neste caderno e esclareça as dúvidas com o
avaliador, caso necessário. Para a execução desta prova estão disponíveis máquinas,
equipamentos, instrumentos, ferramentas, materiais de consumo e/ou toda a documentação
técnica necessária. Ao realizar as atividades, lembre-se de cumprir todas as exigências
referentes às normas de saúde, segurança do trabalho e de meio ambiente. Ao final da
avaliação, este caderno e demais itens disponibilizados devem ser devolvidos ao avaliador.
Em caso de dúvida, dirija-se somente ao avaliador.
## 2. Contextualização
Um estabelecimento que integra os serviços de Pet Shop e Clínica Veterinária enfrenta
desafios críticos na gestão de seu almoxarifado. A operação envolve a manipulação de uma
vasta gama de insumos, desde rações de diferentes marcas e pesos (frequentemente
comercializadas em sacos de diversos quilos) até medicamentos controlados e vacinas que
exigem rigoroso controle de validade.Atualmente, a ausência de um sistema automatizado
para monitorar a entrada e saída desses materiais tem gerado perdas financeiras
significativas devido a produtos vencidos nas prateleiras e rupturas de estoque (falta de
produtos essenciais). Essa desorganização compromete diretamente o atendimento clínico,
pois a falta de uma vacina ou medicamento específico pode inviabilizar procedimentos de
urgência. A complexidade aumenta ao considerar a necessidade de gerenciar dosagens
específicas (ml e mg) e garantir que itens críticos nunca fiquem abaixo do nível de
segurança.
## 3. Desafio
Desenvolver um sistema web que permita ao usuário do almoxarifado realizar o controle
rigoroso de insumos do Pet Shop e da Clínica Veterinária. O sistema deve possibilitar o
cadastro de produtos e a visualização intuitiva do inventário. É fundamental que a
ferramenta gerencie a entrada e saída de itens, incluindo um mecanismo de estoque
mínimo com alertas automáticos para evitar desabastecimento. Além disso, o sistema deve
garantir a rastreabilidade completa de cada operação, registrando a data e o responsável

por cada movimentação de insumo.Está disponível um vídeo de briefing da entrevista
com o cliente no seu computador.
- Matriz de Entregas
Nº,Nome da Entrega,Tipo de Entrega,Tempo Estimado (min)
1,Lista de requisitos funcionais,Documentação de requisitos,10 min
2,Diagrama Entidade Relacionamento (DER),Modelagem de banco de dados,10 min
3,Script SQL saep_db com 3 registros,Desenvolvimento de banco de dados,10 min
4,Interface de Login,Desenvolvimento do sistema,20 min
5,Interface Principal,Desenvolvimento do sistema,20 min
6,Interface Cadastro de Produto,Desenvolvimento do sistema,45 min
7,Interface Gestão de Estoque,Desenvolvimento do sistema,45 min
8,Casos de Teste,Documentação de testes,10 min
9,Requisitos de Infraestrutura,Documentação do sistema,10 min

- Detalhamento dos Resultados e Entregas Esperadas
1 - Lista de requisitos funcionais
1.1. Descrever os requisitos funcionais necessários para atender ao desafio proposto.
1.2. A entrega consiste no preenchimento do documento técnico conforme padrão
acordado.
2 - Diagrama Entidade Relacionamento (DER)
2.1. Modelar a estrutura do banco de dados e entregar em formato de imagem (.png ou
## .jpeg).
3 - Script de criação e população do banco de dados
3.1. Nomear obrigatoriamente o banco de dados como saep_db.
3.2. O script deve conter pelo menos três registros para todas as tabelas criadas,
respeitando tipos de dados e integridade referencial (chaves primárias e estrangeiras).
3.3. Entregar o arquivo no formato .sql.
4 - Interface de autenticação de usuários (login)
4.1. Desenvolver tela de autenticação. Em caso de falha, informar o motivo ao usuário e
redirecioná-lo para nova tentativa.
5 - Interface principal do sistema
5.1. Exibir o nome do usuário logado.
5.2. Implementar função de logout com redirecionamento para a tela de login.
5.3. Disponibilizar acesso às interfaces de "Cadastro de Produto" e "Gestão de Estoque".
6 - Interface cadastro de produto
6.1. Listar os produtos do saep_db em uma tabela, carregada automaticamente ao acessar
a interface.
6.2. Implementar campo de busca por termo que atualize a listagem em tempo real.
6.3. Implementar funções de CRUD (Inserir, Editar e Excluir produtos).
6.4. Validar campos obrigatórios, exibindo alertas em caso de dados inválidos ou ausentes.
6.5. Incluir botão para retornar à interface principal do sistema.
7 - Interface gestão de estoque
7.1. Implementar logicamente um algoritmo de ordenação (ex: Bubble Sort ou Quicksort)
para listar os produtos em ordem alfabética.
7.2. Permitir a seleção do produto e do tipo de movimentação (entrada ou saída).

7.3. Disponibilizar campo para inserção manual da data da movimentação.
7.4. Implementar verificação automática: gerar alerta caso uma saída resulte em quantidade
abaixo do estoque mínimo configurado para o item.
8 - Descritivo de teste de software
8.1. Descrever ferramentas, ambiente e cenários de teste para cada requisito funcional.
9 - Lista de requisitos de infraestrutura
9.1. Especificar o SGBD e versão, Linguagem de programação e versão, e o Sistema
Operacional e versão utilizados.
- Formato das Entregas
O aluno deve organizar os arquivos em uma única pasta compactada ( formato .zip )
nomeada com seu  nome completo , contendo:
- Documentos de texto (Requisitos, Testes, Infraestrutura).
- DER (arquivo de imagem).
- Script do banco de dados (arquivo .sql).
- Pasta denominada "sistema" contendo todo o código-fonte desenvolvido.
- Anexo I - Briefing do Cliente
Entrevista com o Proprietário:"Olá, meu negócio é um pouco complexo porque unimos a
venda de produtos de varejo com o atendimento clínico hospitalar. No Pet Shop, preciso
controlar rigorosamente as marcas e os modelos de rações, pois cada uma tem um peso
diferente em kg e o giro é muito rápido. Já na parte da Clínica, o buraco é mais embaixo:
lidamos com medicamentos e vacinas que têm prazos de validade curtos e não podem
vencer de jeito nenhum.Além disso, para os insumos hospitalares, trabalhamos com
dosagens fracionadas em ml e mg, então o sistema precisa ser preciso. O que eu realmente
sinto falta é de um alerta de estoque que eu possa configurar individualmente. Por exemplo,
meu estoque mínimo de vacina antirrábica deve ser diferente do estoque mínimo de uma
ração premium, entende? Preciso que meus funcionários, que estão focados no
atendimento aos bichinhos, tenham uma interface limpa e intuitiva, onde não percam tempo
tentando descobrir como registrar uma saída de material."
- Assinaturas e Encerramento
AVALIADOR: Renato Luis de Oliveira
## ESTUDANTE:
## CÓDIGO DA PROVA:
