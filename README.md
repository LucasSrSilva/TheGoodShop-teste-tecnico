# TheGoodShop

TheGoodShop é uma loja online de produtos de vestuário.

## Tecnologias Utilizadas

- **Astro**: Framework principal para construção do projeto.
- **React**: Criação de componentes reutilizáveis.
- **JavaScript**: Lógica e interatividade.
- Outros frameworks podem ser integrados conforme necessário.

## Como Executar o Projeto

1. **Instale as dependências:**

   ```bash
   pnpm install
   ```

2. **Faça o build do projeto:**

   ```bash
   pnpm run build
   ```

3. **Inicie o modo preview:**
   ```bash
   pnpm run preview
   ```

Acesse o endereço exibido no terminal para visualizar o projeto em modo preview.

> **Nota:** Os produtos não serão exibidos inicialmente, pois é necessário executar o servidor de dados.  
> Abra um novo terminal e inicie o servidor JSON com o comando abaixo:

```bash
npx json-server --watch db/dbTeste.json --port 3001
```

Isso permitirá que o projeto acesse e exiba os produtos corretamente.

## Licença

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica. Não há comercialização de produtos reais e as imagens utilizadas são provenientes de bancos de imagens gratuitos (stock images) apenas para fins ilustrativos.
