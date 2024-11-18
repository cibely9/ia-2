async function run() {
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    alert("Por favor, insira uma mensagem antes de enviar.");
    return;
  }

  // Buscar histórico ao usar o comando "buscar por"
  if (prompt.toLowerCase().startsWith("buscar por")) {
    const keyword = prompt.replace("buscar por", "").trim();
    if (keyword.length === 0) {
      addMessage("Por favor, especifique uma palavra-chave para buscar.", "ai");
      return;
    }

    const results = searchHistory(keyword);
    if (results.length > 0) {
      addMessage(`Resultados encontrados para "${keyword}":`, "ai");
      results.forEach(result => addMessage(`[${result.sender}]: ${result.text}`, "ai"));
    } else {
      addMessage(`Nenhuma conversa encontrada para "${keyword}".`, "ai");
    }
    return;
  }

  // Salvar e continuar com a conversa normal
  addMessage(prompt, 'user');
  saveHistory(prompt, 'user');

  const currentContext = getContext();
  const fullPrompt = `Contexto atual: ${currentContext}. Pergunta do usuário: ${prompt}`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = await response.text();

    if (text && text.trim().length > 0) {
      addMessage(text, 'ai');
      saveHistory(text, 'ai');
    } else {
      const fallback = "Desculpe, não consegui processar sua solicitação. Tente novamente.";
      addMessage(fallback, 'ai');
      saveHistory(fallback, 'ai');
    }
  } catch (error) {
    console.error("Erro ao gerar resposta:", error);
    const fallback = "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente.";
    addMessage(fallback, 'ai');
    saveHistory(fallback, 'ai');
  }

  document.getElementById("prompt").value = '';
}
