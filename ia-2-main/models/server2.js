const mongoose = require('mongoose');

const uri = "mongodb+srv://cibelyojorge:SkOo63R1oKpHLkjt@cluster0.pv65m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
})
.catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

