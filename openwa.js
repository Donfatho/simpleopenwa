const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LegacySessionAuth, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const { getSystemErrorMap } = require('util');
const { Configuration, OpenAIApi } = require("openai");
const { url } = require('inspector');
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log(session);
});
 

client.initialize();
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})

client.on('ready', () => {
    console.log("ready to message")
});

client.on('message', message => {
	if(message.body === 'Siapa kamu?') {
		message.reply('Namaku Eris, Saya Ai yang dibuat oleh DonFatho untuk dapat membantumu dengan pertanyaan tentang berbagai topik, misalnya teknologi, sains, seni, sejarah, dll. Kamu juga bisa memintaku untuk memberikan penjelasan tentang konsep" yang mungkin asing buatmu, atau saya juga bisa memberikan saran atau rekomendasi berbagai hal. Ketik /Eris sebelum bertanya selanjutnya saya akan menjawabnya sebaik mungkin!');
	}
});

client.on('message', message => {
	if(message.body === 'Kamu siapa?') {
		message.reply('Namaku Eris, Saya Ai yang dibuat oleh DonFatho untuk dapat membantumu dengan pertanyaan tentang berbagai topik, misalnya teknologi, sains, seni, sejarah, dll. Kamu juga bisa memintaku untuk memberikan penjelasan tentang konsep" yang mungkin asing buatmu, atau saya juga bisa memberikan saran atau rekomendasi berbagai hal. Ketik /Eris sebelum bertanya selanjutnya saya akan menjawabnya sebaik mungkin!');
	}
});

client.on('message', message => {
	if(message.body === 'Hallo') {
		message.reply('Hallo jg, Namaku Eris, Saya Ai yang dibuat oleh DonFatho untuk dapat membantumu dengan pertanyaan tentang berbagai topik, misalnya teknologi, sains, seni, sejarah, dll. Kamu juga bisa memintaku untuk memberikan penjelasan tentang konsep" yang mungkin asing buatmu, atau saya juga bisa memberikan saran atau rekomendasi berbagai hal. Ketik /Eris sebelum bertanya selanjutnya saya akan menjawabnya sebaik mungkin!');
	}
});

client.on('message', message => {
	if(message.body === 'Hai') {
		message.reply('Hai juga, Namaku Eris, Saya Ai yang dibuat oleh DonFatho untuk dapat membantumu dengan pertanyaan tentang berbagai topik, misalnya teknologi, sains, seni, sejarah, dll. Kamu juga bisa memintaku untuk memberikan penjelasan tentang konsep" yang mungkin asing buatmu, atau saya juga bisa memberikan saran atau rekomendasi berbagai hal. Ketik /Eris sebelum bertanya selanjutnya saya akan menjawabnya sebaik mungkin!');
	}
});

client.on('message', message => {
	if(message.body === 'Ping') {
		message.reply('Pang Ping Pang Ping, Kamu kira BlackBerry? Baca deskripsi dulu');
	}
});

client.on('message', message => {
	if(message.body === 'Wkwk') {
		message.reply('Jangan katawa kak, mulutmu bau');
	}
});

client.on('message', message => {
	if(message.body === 'Apa kabar?') {
		message.reply('Alhamdulillah baik, Apa yang bisa saya bantu? Ketik /Eris sebelum bertanya ya');
	}
});

client.on('message', message => {
	if(message.body === 'Kapan nikah?') {
		message.reply('Urus urusanmu sendiri, baca deskripsi dulu sebelum mengetik pertanyaan.');
	}
});

client.on('message', message => {
	if(message.body === 'Eris') {
		message.reply('Iya sayang, ada yang bisa saya bantu? Ketik /Eris dulu yang sebelum bertanya.Thx');
	}
});


function man(){
    client.on('message', async message => {
        if(message.body.includes('/Eris')) {
            let text = message.body.split('/Eris')[1];
            var qst = `Q: ${text}\nA:`;
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: qst,
                temperature: 0,
                max_tokens: 300,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            message.reply(response.data.choices[0].text);
                                                        
        }
        else if(message.body.includes('/draw')) {
            let text = message.body.split('/draw')[1];
            var qst = `Q: ${text}\nA:`;
            const response = await openai.createImage({
                prompt: text,
                n: 1,
                size: '512x512'
            });
            var imgUrl = response.data.data[0].url;
            const media = await MessageMedia.fromUrl(imgUrl);
            await client.sendMessage(message.from, media, {caption: "your image"})
        }
    });
    
}

man();