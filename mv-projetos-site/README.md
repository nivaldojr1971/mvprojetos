# MV Projetos — Site Institucional

Site completo, moderno e responsivo para a **MV Projetos** (engenharia em projetos
elétricos, fotovoltaicos, subestações e redes de distribuição).

## Como visualizar

Basta abrir o arquivo `index.html` no navegador (não precisa de servidor).

## Estrutura

```
mv-projetos-site/
├── index.html      # Página completa (hero, quem somos, serviços, processo, depoimentos, contato, rodapé)
├── styles.css      # Estilos (tema escuro + verde da identidade da logo)
├── script.js       # Interações (menu, animações, contador, carrossel, formulário)
└── assets/
    └── logo.png    # Cópia local da logo (fallback caso o Imgur falhe)
```

## Sobre a logo

A logo é carregada do Imgur (`https://i.imgur.com/JZosNe8_d.png...`) em todos os
locais: favicon, header, hero, "quem somos" e rodapé.

- O Imgur **bloqueia (HTTP 403)** requisições que enviam `Referer` de `localhost`,
  por isso os elementos usam `referrerpolicy="no-referrer"`.
- Como segurança extra, cada `<img>` tem `onerror` que troca para a cópia local
  `assets/logo.png` se o Imgur não responder.

## Personalização (dados a substituir)

Procure por `<!-- ATENÇÃO -->` no `index.html` e ajuste:

1. **WhatsApp** — troque `5500000000000` pelo número real (formato: 55 + DDD + número).
2. **E-mail** — troque `contato@mvprojetos.com.br` pelo e-mail real.
3. **Depoimentos** — os 4 depoimentos são exemplos; substitua por clientes reais.
4. **Números (estatísticas)** — em `index.html`, nos elementos `data-count`, ajuste
   projetos entregues, MWp, concessionárias e anos de experiência.
5. **Logo** — usada no header, hero, seção "quem somos", rodapé e favicon.
   Para trocar, substitua as 5 ocorrências de `https://i.imgur.com/JZosNe8_d.png...`
   no `index.html` e também `assets/logo.png` (fallback).

## Formulário de contato

O formulário valida os campos e mostra mensagem de confirmação. Para receber os
mensagens por e-mail, descomente a linha `window.location.href = 'mailto:...'`
no final de `script.js` ou conecte a um serviço como Formspree/Getform.

## Seções

- **Hero** com badge, título, CTAs, diferenciais e card de estatísticas animadas
- **Quem somos** com visão institucional, missão/visão/valores e destaques
- **Serviços** — 6 cards (Projetos Elétricos, Fotovoltaicos, Subestações,
  Redes de Distribuição, Estudos & Conexões e CTA personalizado)
- **Processo** — 4 etapas do briefing à aprovação
- **Depoimentos** — carrossel com autoplay, setas, dots e swipe
- **Contato** — formulário validado + cartões de WhatsApp, e-mail, Instagram e atendimento
- **Rodapé** completo + botão flutuante de WhatsApp

## Recursos técnicos

- 100% responsivo (desktop, tablet e mobile)
- Menu mobile com animação e navegação com scroll suave
- Animações de entrada (IntersectionObserver) com suporte a `prefers-reduced-motion`
- SEO básico (título, meta description, Open Graph)
- Sem dependências externas além das fontes Google (Sora + Inter)
