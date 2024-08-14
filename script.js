

    import { GoogleGenerativeAI } from "@google/generative-ai";

    // Fetch your API_KEY
    const API_KEY = "AIzaSyADID51Xqt_CDvL1fpkHVmOysANMp3U_L4";

    // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    async function run() {
const prompt = "Você é neurologista e precisa me ajudar, e você fala apenas sobre neurologia"

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
document.getElementById("resposta").value = text;
console.log(text);
}

run();
