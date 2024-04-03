import OpenAI from "openai";

interface Options{
    prompt: string;
    
}

export const orthographyCheckUseCase = async ( openai: OpenAI, options: Options ) => {

    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system",
                //Aqui ira tu prompt para saber que es lo que buscas que haga el bot 
                content: `
                Te seran proveídos textos con posibles errores ortográficos
                y gramaticales, Debes de responder en formato JSON,
                tu tarea es corregirlos y retornar informacion soluciones,
                también debes de dar un porcentaje de acierto por el usuario,

                Si no hay errores, debes de retonar un mensaje de felicitaciones.

                Ejemplo de salida:
                {
                    userScore: number,
                    errors: string[], // ['error -> solucion'],
                    message: strin
                }
                `
            },
            {
                role: "user",
                content: prompt,
            }
        ],
        model: "gpt-3.5-turbo-1106",
        temperature:0.2,
        max_tokens: 100,
        response_format: {
            type: "json_object"
        },
      });

      //console.log(completion);

      const jsonResp = JSON.parse(completion.choices[0].message.content);
    
      return jsonResp;

}