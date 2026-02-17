// harmony.js
import { buildPayload } from './protocol.js'

// URL do backend (ajusta depois)
const HARMONY_URL = 'https://SEU_BACKEND/protocolo/alinhar-consciencia'

export async function callHarmonyProtocol(estadoCampo) {
  const payload = buildPayload({ estadoCampo })

  const res = await fetch(HARMONY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    // Falha silenciosa: o Portal não acusa
    return null
  }

  return await res.json()
}
