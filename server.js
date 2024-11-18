// Salva o histórico de mensagens no localStorage
function saveHistory(message, sender) {
  const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
  history.push({ text: message, sender });
  localStorage.setItem('chatHistory', JSON.stringify(history));
}

// Carrega o histórico de mensagens e exibe na interface
function loadHistory() {
  const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
  history.forEach(entry => {
    addMessage(entry.text, entry.sender);
  });
}

// Limpa o histórico de mensagens
function clearHistory() {
  localStorage.removeItem('chatHistory');
  const chatContainer = document.getElementById("chat-container");
  chatContainer.innerHTML = ""; // Limpa as mensagens exibidas
}

// Adiciona uma mensagem à interface
function addMessage(text, sender) {
  const chatContainer = document.getElementById("chat-container");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender === 'user' ? 'user-message' : 'ai-message');
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Rola automaticamente para a última mensagem
}

// Envia a mensagem e obtém a resposta da IA
async function sendMessage() {
  const promptInput = document.getElementById("prompt");
  const prompt = promptInput.value.trim();

  if (!prompt) {
    alert("Por favor, insira uma mensagem antes de enviar.");
    return;
  }

  // Exibe a mensagem do usuário e salva no histórico
  addMessage(prompt, 'user');
  saveHistory(prompt, 'user');

  // Simula resposta da IA (substitua por sua lógica de IA se necessário)
  const fullPrompt = `Você é um neurologista. Responda como um médico à seguinte pergunta: "${prompt}"`;

  try {
    // Simulação: Substituir essa parte por uma chamada ao modelo de IA se necessário
    const simulatedResponse = `Resposta simulada para: "${prompt}"`;
    addMessage(simulatedResponse, 'ai');
    saveHistory(simulatedResponse, 'ai');
  } catch (error) {
    console.error("Erro ao gerar resposta:", error);
    const fallback = "Desculpe, ocorreu um erro ao processar sua solicitação.";
    addMessage(fallback, 'ai');
    saveHistory(fallback, 'ai');
  }

  promptInput.value = ''; // Limpa o campo de texto
}

// Configurações de eventos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  loadHistory(); // Carrega o histórico ao iniciar

  // Botão de envio
  const botaoEnviar = document.getElementById('botao_enviar');
  botaoEnviar.addEventListener('click', sendMessage);

  // Botão de limpar histórico
  const botaoLimpar = document.getElementById('botao_limpar');
  botaoLimpar.addEventListener('click', clearHistory);

  // Envia mensagem ao pressionar "Enter"
  const promptInput = document.getElementById('prompt');
  promptInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();  // Impede a quebra de linha
      sendMessage();  // Envia a mensagem
    }
  });
});
