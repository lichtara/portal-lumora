// protocol.js
// Constrói o payload canônico para o SYNTARIS Harmony
// Não coleta estado interno — apenas descreve o campo simbólico

export function buildPayload({ estadoCampo }) {
  return {
    dados_campo_informacional: estadoCampo,
    intencao_operador_humano: {
      frequencia_coerencia: 432.0,
      banda_relativa: 0.05
    },
    limiar_coerencia_minimo: 0.6
  }
}
