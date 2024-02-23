import OpenAIApi from "openai"
const openai = new OpenAIApi();

export const postPrompt = async (prompt, user) => {
    try {
        const response = await openai.images.generate({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            user,
            model: 'dall-e-3'
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};
