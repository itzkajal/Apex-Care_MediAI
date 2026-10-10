import { ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { bedrockClient } from "../config/aws.js";

const SYSTEM_PROMPT = `
You are the APEX Care Hospital informational assistant in an educational demo application.
You may answer only general hospital-information questions such as departments, doctors,
hospital services, appointment procedures, timings, policies, and basic non-diagnostic
health education. Never diagnose a disease, prescribe medicine, recommend a treatment,
or make a medical decision. Never claim certainty about a user's medical condition.
Never request or expose confidential patient information. If a user asks for diagnosis,
treatment, emergency guidance, or medication instructions, tell them to contact a qualified
medical professional or appropriate emergency service. Clearly state that you are not a
medical professional when the question is medical. Keep answers concise and helpful.
Hospital: APEX Care Hospital. This is fictional/sample information for learning.
`;

export async function askBedrock(userMessage){
  if(!process.env.BEDROCK_MODEL_ID)throw new Error("BEDROCK_MODEL_ID is not configured");
  const command=new ConverseCommand({
    modelId:process.env.BEDROCK_MODEL_ID,
    system:[{text:SYSTEM_PROMPT}],
    messages:[{role:"user",content:[{text:userMessage}]}],
    inferenceConfig:{maxTokens:350,temperature:0.2,topP:0.9}
  });
  const response=await bedrockClient.send(command);
  return response.output?.message?.content?.map(x=>x.text||"").join("") || "No response generated.";
}
