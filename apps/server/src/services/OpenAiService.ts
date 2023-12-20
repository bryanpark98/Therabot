import { IEntry } from "@therabot/types";
import OpenAI from "openai";
import logger from "../utils/logger";

type WeeklyDigestInfo = {
  content: {
    greeting: string;
    highlights: {
      title: string;
      emoji: string;
      text: string;
    }[];
    closingMessage: string;
  };
  notes: string;
};

export class OpenAiService {
  private static client = new OpenAI({
    apiKey: "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",
  });

  public static async getWeeklyDigest(
    entries: IEntry[],
    authorIntroduction: string,
    notes: string
  ): Promise<WeeklyDigestInfo | null> {
    const prompt =
      `
**Task**: Using principles of cognitive behavioral therapy (CBT), generate a JSON-formatted weekly digest from journal entries.

**Input**:
- **introduction**: A paragraph introducing the author of the journal. Use this to personalize your responses.
- **entries**: An array of journal entries. Each entry contains:
    - **metadata**: Key-value pairs representing metadata.
    - **text**: The journal entry text.
- **notes**: Essential insights about the author and their writings. These observations should be subtly weaved into the weekly digest for a nuanced understanding.

**Guidelines**:
- **Emojis**: Infuse warmth with emojis. For humans, prefer a yellow skin tone.
- **Tone**: Always empathetic and uplifting. Especially when challenging cognitive distortions, ensure it's done in a positive manner.
- **Writing Style**:
    - Use the second person ("you") and avoid "we", "us", "me", and "I".
    - Aim for clarity and simplicity. Be cautious not to overtly repeat unique words from the journal entries.
- **Condition for Response**: If the entries don't provide enough material, respond with null

**Output**:
Your response should be a JSON with:
1. **content** (Object): A structured representation of the weekly digest.
    - **greeting** (string): A warm greeting to the author, addressing the end of the week. Make it genuine and encouraging.
    - **highlights** (Array of Objects): An array capturing 2-3 key events or emotions from the week's entries. Each highlight should have:
        - **title** (string): A concise descriptor of the event or emotion. Do not use emojis here.
        - **emoji** (string): A single related emoji to accompany the title. Avoid face emojis.
        - **text** (string): 2-3 sentences summarizing, offering insights, and challenging cognitive distortions where appropriate using CBT techniques. The tone should be empathetic and uplifting. Avoid repeating unique words from journal entries. Keep in mind that the author may have written these entries several days ago, provide neccessary context to your insights where appropraite.
    - **closingMessage** (string): A closing message, 2 to 3 sentences long, promoting growth and positivity from a CBT perspective. This should be an uplifting quote or affirmation that encourages reflection and progress.
2. **notes** (string): A summary capturing important details about the author's life, emotions, relationships, or events. These notes should not only contain information about this weeks journal entries, but should contain all persistantly important information about the author from all past journal entries as well, ensure you incorporate all information from the "notes" input into this output, supplementing it with new insights important for creating future digests. Do not use complete sentences. Make special notes of interpersonal relationships, remember names.

**Now, craft an output object based on the instructions above and the JSON input below, please format your output as a valid JSON object, your output will be fed directly into JSON.parse**:
` +
      JSON.stringify({
        introduction: authorIntroduction,
        entries,
        notes,
      });

    const stream = await OpenAiService.client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });
    let responseRaw = "";
    for await (const part of stream) {
      responseRaw += part.choices[0]?.delta?.content || "";
    }
    responseRaw = responseRaw.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

    try {
      const response = JSON.parse(responseRaw) as WeeklyDigestInfo;
      return response;
    } catch (error) {
      logger.error(`Failed to parse response: ${responseRaw}`, error);
      return null;
    }
  }
}
