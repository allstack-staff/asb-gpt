require("dotenv").config();
const Piii = require("piii");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

let body = "fuder";
async function _gptFilter(body: string) {
    const response = await openai.createModeration({
        input: body.split(" ").slice(0, 20),
    });
    return response;
}

async function testing() {
    interface Score {
        [key: string]: number;
    }

    const result = await _gptFilter(body);
    const flagged = result.data.results[0].flagged;
    if (flagged) {
        return false;
    }
    const score = result.data.results[0].category_scores as Score;

    let validation = true;
    for (const item of Object.values(score)) {
        if (item < 0.005) {
            validation = false;
            break;
        }
    }

    console.log(result.data.results[0]);
    console.log(flagged);
    console.log(validation);
}

function valid(body: string): boolean {
    const piii = new Piii();
    const resultado = piii.has(body);
    return resultado;
}
testing();