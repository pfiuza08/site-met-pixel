(function(){
  // Utilidades
  const $ = (sel) => document.querySelector(sel);
  const toParams = (search) => Object.fromEntries(new URLSearchParams(search));

  // Ano no rodapé
  $("#year").textContent = new Date().getFullYear();

  // Armazena UTMs da URL na sessão
  const utms = toParams(location.search);
  const utmKeys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
  const utmData = {};
  utmKeys.forEach(k => { if (utms[k]) utmData[k] = utms[k]; });
  if (Object.keys(utmData).length) {
    sessionStorage.setItem("utm", JSON.stringify(utmData));
  }

  // Resgata UTMs (se houver)
  const getUtm = () => {
    try { return JSON.parse(sessionStorage.getItem("utm") || "{}"); }
    catch { return {}; }
  };

  // Envia evento para o Pixel com UTMs anexadas
  function sendEvent(name, params={}) {
    const payload = Object.assign({}, params, getUtm());
    try {
      // Eventos padrão
      if (["PageView","ViewContent","Lead","AddToCart","InitiateCheckout","CompleteRegistration","Purchase","Contact"].includes(name)) {
        fbq("track", name, payload);
      } else {
        // Eventos customizados
        fbq("trackCustom", name, payload);
      }
      // Console para depuração
      console.log("[PIXEL]", name, payload);
    } catch (e) {
      console.warn("fbq não disponível ainda", e);
    }
  }

  // Botões de exemplo
  $("#btnViewContent").addEventListener("click", () => {
    sendEvent("ViewContent", { content_name: "Conteudo Demo", content_category: "Landing" });
  });

  $("#btnLead").addEventListener("click", () => {
    sendEvent("Lead", { content_name: "Ebook Exemplo" });
  });

  $("#btnAddToCart").addEventListener("click", () => {
    sendEvent("AddToCart", { value: 49.00, currency: "BRL", content_name: "Produto Demo" });
  });

  $("#btnInitiateCheckout").addEventListener("click", () => {
    sendEvent("InitiateCheckout", { value: 49.00, currency: "BRL", num_items: 1 });
  });

  $("#btnCompleteRegistration").addEventListener("click", () => {
    sendEvent("CompleteRegistration", { status: "success" });
  });

  $("#btnPurchase").addEventListener("click", () => {
    // Em compras reais, preencha value/currency com valores corretos
    sendEvent("Purchase", { value: 49.00, currency: "BRL", content_name: "Produto Demo" });
  });

  // WhatsApp -> Contact
  document.body.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    try {
      const url = new URL(a.href);
      if (url.hostname.includes("wa.me") || url.hostname.includes("api.whatsapp.com")) {
        sendEvent("Contact", { method: "whatsapp" });
      }
      // Outbound genérico
      if (url.origin !== location.origin) {
        sendEvent("OutboundClick", { url: a.href });
      }
    } catch {}
  });

  // Scroll 50%
  let fired50 = false;
  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (!fired50 && scrolled >= 0.5) {
      fired50 = true;
      sendEvent("Scroll50");
    }
  });

  // Tempo na página: 10s
  setTimeout(() => sendEvent("TimeOnPage10s"), 10_000);

  // Banner de consentimento simples (opcional)
  const consentKey = "pixelConsent";
  const consent = localStorage.getItem(consentKey);
  const $consent = $("#consent");

  function hideConsent() { $consent.classList.add("hidden"); }
  function showConsent() { $consent.classList.remove("hidden"); }

  if (consent === null) {
    showConsent();
  }

  $("#consentAccept").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem(consentKey, "granted");
    hideConsent();
    sendEvent("ConsentGranted");
  });
  $("#consentReject").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem(consentKey, "denied");
    hideConsent();
    sendEvent("ConsentDenied");
  });
})();