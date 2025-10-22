export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { default: sdk } = await import('./instrumentation')
    sdk.start()
    console.log('OpenTelemetry instrumentation started successfully')
  }
}