import { storage } from "../storage";
import ExpiryMap from 'expiry-map'
import { v4 as uuidv4 } from 'uuid'
import { fetchSSE } from './fetch-sse'
import type  { GenerateAnswerParams, Provider } from './types'
import { ChatGPTProvider } from './chatgpt'


let chatgptInstance;


export async function setConversationProperty(
  token: string,
  conversationId: string,
  propertyObject: object,
) {
  await request(token, 'PATCH', `/conversation/${conversationId}`, propertyObject)
}



const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJuZWxlamU0ODA0QDNta3ouY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsidXNlcl9pZCI6InVzZXItZGN2QXBSaWl6OUROQzJCcnBPMkFLTXJyIn0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzUxNWJhNDFiYWMyMWQ3NDk5Zjk2ZDYiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkyNDI4NDUyLCJleHAiOjE2OTM2MzgwNTIsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb3JnYW5pemF0aW9uLndyaXRlIG9mZmxpbmVfYWNjZXNzIn0.ziVR88ses_4ASGlZ_-1A6WxydJTy1uNGnMyvEmFxbZ5SMp6c0M0TDHFCarBHAl87D3JN8AvWOlYZntG7EbJLfaO01FRq0lTvqJDzLCFJUeYu3fA4Su55OYrg2oUaK5oSXRrkkruyVN5uAG5SX6xrp_2asuRUgac1wPbf8kn2M0szGnvU7sAf54BgzriU8q-reUHsw6v8tYYKyb9OOgn4MrJBb0FUtoK0d9hCk8nujSTU_Dn4fq0jpazJ54BfDgrAP5dCiSW9y_GAmhmxvq2_8DpZfFs-kD8i3kw07KsMPrCAut0lHXD2PuHzG1_IgQVg_fubu0f_qTpIdh-LcUPIQA'

const conversationId = 'ff166538-09f5-4827-8d81-0fed24c9f67e'

async function request(token, method, path, data) {
  return fetch(`https://chat.openai.com/backend-api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
}
async function generateAnswers(port: any, question: string) { 
  let provider: Provider 
  provider = new ChatGPTProvider(token)
 const controller = new AbortController()
  port.onDisconnect.addListener(() => {
    controller.abort()
    cleanup?.()
  }) 
const { cleanup } = await provider.generateAnswer({
    prompt: question,
    signal: controller.signal,
    onEvent(event) {
      if (event.type === 'done') {
        port.postMessage({ event: 'DONE' })
        return
      }
      port.postMessage(event.data)
    },
  })
} 
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (msg) => {
    console.debug('received msg', msg)
    if(msg.question){
    try {
      await generateAnswers(port, msg.question)
    } catch (err: any) {
      console.error(err)
      port.postMessage({ error: err.message })
    }
    }
  })
})

// chrome.runtime.onInstalled.addListener(async () => {
//   const convs = await fetchConversations(token)
//   const conv = await fetchConversation(token)
//   // console.log(convs)
//   // console.log(conv)
//   const models = await fetchModels(token)
//   console.log(convs)

// });
