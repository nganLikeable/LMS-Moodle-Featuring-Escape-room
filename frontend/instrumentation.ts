// Next.js instrumentation for OpenTelemetry
// This runs only on the server side in Next.js

export async function register() {
  // Only run on server-side Node.js runtime
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      console.log('Initializing OpenTelemetry...')
      
      // Simple server-side only setup
      const { resourceFromAttributes } = require('@opentelemetry/resources')
      const { NodeSDK } = require('@opentelemetry/sdk-node')
      const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
      const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http')

      // Configure the SDK to export telemetry data to OTLP collector
      const traceExporter = new OTLPTraceExporter({
        url: 'http://otel-collector:4318/v1/traces',
      })

      // Create resource with service information
      const resource = resourceFromAttributes({
        'service.name': 'escape-room-frontend',
        'service.version': '1.0.0',
      })

      // Initialize the SDK
      const sdk = new NodeSDK({
        resource,
        traceExporter,
        instrumentations: [
          getNodeAutoInstrumentations({
            '@opentelemetry/instrumentation-fs': {
              enabled: false,
            },
          }),
        ],
      })

      // Start the SDK
      sdk.start()
      
      console.log('OpenTelemetry initialized successfully')
      
    } catch (error) {
      console.log('Failed to initialize OpenTelemetry:', error)
    }
  }
}