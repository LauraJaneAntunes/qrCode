# QR Code Generator - Projeto Ecosrev

## Visão Geral

Este é um componente de gerador de QR Code desenvolvido como parte do Projeto Integrador **Ecosrev**. A ferramenta permite a geração de QR Codes contendo informações sobre pontos de recompensa para usuários do sistema Ecosrev.

## Sobre o Ecosrev

O Ecosrev é um projeto integrador focado em sustentabilidade e incentivo a práticas ecológicas. O sistema recompensa usuários por suas ações sustentáveis através de pontos que podem ser trocados por benefícios. 
Acesse em https://ecos-rev-pi.vercel.app/

## Funcionalidades

- Gera QR Codes únicos contendo informações sobre pontos do usuário
- Inclui hash de segurança para garantir a autenticidade do código
- Interface intuitiva e responsiva
- Validação de entrada para garantir dados corretos

## Tecnologias Utilizadas

- React.js
- API externa para geração de QR Codes
- Algoritmo de hash para segurança

## Como Executar

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o projeto:
   ```
   npm start
   ```
4. Acesse `http://localhost:3000` no navegador

## Como Usar

1. Digite o número de pontos no campo de entrada
2. Clique no botão "Gerar QR Code"
3. O QR Code será exibido na tela
4. Utilize o botão "Limpar" para gerar um novo QR Code

## Integração com o Ecosrev

Este componente integra-se ao sistema principal do Ecosrev das seguintes maneiras:

- Os QR Codes gerados são utilizados para validação de pontos no aplicativo principal
- Permite que administradores do sistema gerem códigos de recompensa para distribuição
- Facilita o sistema de troca de pontos por benefícios sustentáveis

## Próximos Passos

- Implementação de histórico de QR Codes gerados
- Adição de opções de personalização visual dos códigos
- Integração direta com banco de dados do sistema principal

## Equipe

Este componente faz parte do Projeto Integrador Ecosrev, desenvolvido pela equipe:

| Nome                          | GitHub                                               |
| ----------------------------- | ---------------------------------------------------- |
| *Gabriel Yamaoka Bernardes* | [YamaokaK](https://github.com/YamaokaK)                 |
| *Gesley de Oliveira Rosa*   | [GesleyOliveira](https://github.com/GesleyOliveira)     |
| *João Lucas Melo*          | [JoaoLucasMdO](https://github.com/JoaoLucasMdO)         |
| *Laura Jane Antunes*        | [LauraJaneAntunes](https://github.com/LauraJaneAntunes) |
| *Mariana Hirata*            | [marianakakimoto](https://github.com/marianakakimoto)   |
| *Mateus Ferreira*           | [AEntropia](https://github.com/AEntropia)               |
