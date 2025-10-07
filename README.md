# Site mínimo com Pixel da Meta (Vercel)

Este repositório contém um site estático simples (HTML/CSS/JS) com instrumentação do Pixel da Meta (Facebook).

## Como usar

1. **Edite o `index.html`** e troque `PIXEL_ID_AQUI` pelo seu **ID real do Pixel** (ex.: `1775066926453461`).
2. (Opcional) Ajuste botões, textos e o link do WhatsApp em `index.html`.
3. Faça login na **Vercel**, crie um novo projeto e aponte para esta pasta, ou simplesmente arraste e solte a pasta no painel da Vercel.
4. Pronto! A URL gerada já estará com o `PageView` e você poderá testar os eventos:

   - `ViewContent` (botão "Ver Conteúdo")
   - `Lead` (botão "Quero o e-book")
   - `AddToCart` (botão "Adicionar ao carrinho")
   - `InitiateCheckout` (botão "Iniciar checkout")
   - `CompleteRegistration` (botão "Concluir registro")
   - `Purchase` (botão "Comprar agora")
   - `Contact` (link do WhatsApp)
   - `Scroll50` (custom) — ao rolar 50% da página
   - `TimeOnPage10s` (custom) — após 10 segundos da visita
   - `OutboundClick` (custom) — em links externos

UTMs presentes na URL (por exemplo `?utm_source=meta&utm_campaign=teste`) são salvas e anexadas aos eventos automaticamente.

## Estrutura

```
/ (raiz)
├─ index.html     # HTML com snippet do Pixel
├─ styles.css     # Estilos básicos
├─ script.js      # Lógica dos eventos e UTM tracking
└─ vercel.json    # Cabeçalhos e config leve (opcional)
```

## Dicas de validação

- Instale a extensão **Meta Pixel Helper** (Chrome) para validar o carregamento do pixel e eventos.
- No Gerenciador de Eventos da Meta, veja a atividade em tempo real.

## LGPD

Este exemplo inclui um banner de consentimento simples. Em produção, considere uma solução de gestão de consentimento (CMP) mais robusta.
