# X Glassmorphism

Extensão simples para o X (Twitter) que aplica:

- Imagem de fundo personalizada
- Cards e sidebars transparentes com blur
- Controle de cor e opacidade do texto e do overlay

Tudo roda localmente no seu navegador. Nenhum dado é enviado para fora.

## Instalação

### Opção recomendada: Carregar descompactado

1. Baixe ou clone este repositório.
2. Abra o Chrome e vá em `chrome://extensions/`
3. Ative o **Modo do desenvolvedor** (canto superior direito).
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta desta extensão.
6. Pronto. Abra o x.com e clique no ícone da extensão para configurar.

### Sobre arquivo .crx

Arquivos `.crx` podem ser gerados pelo Chrome (botão “Empacotar extensão” em `chrome://extensions/`), mas a instalação de `.crx` de fontes não oficiais é restrita na maioria dos navegadores modernos. Por isso a forma mais confiável de compartilhar é pelo código-fonte + “Carregar sem compactação”.

## Como usar

1. Clique no ícone da extensão.
2. **Selecione uma imagem local** (botão de arquivo) **ou** cole a URL de uma imagem.
3. Ajuste blur, opacidade dos cards, sidebar, navegação e cor do texto.
4. As mudanças aplicam na hora nas abas do X.

A imagem local fica salva apenas no seu navegador (não é enviada para lugar nenhum).

## Permissões

- `storage`: salva suas configurações.
- Acesso a `x.com` e `twitter.com`: para aplicar os estilos.

## Licença

MIT