/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "instrumentation";
exports.ids = ["instrumentation"];
exports.modules = {

/***/ "(instrument)/./instrumentation.ts":
/*!****************************!*\
  !*** ./instrumentation.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n// Next.js instrumentation for OpenTelemetry\n// This runs only on the server side in Next.js\nasync function register() {\n    // Only run on server-side Node.js runtime\n    if (true) {\n        try {\n            console.log('Initializing OpenTelemetry...');\n            // Simple server-side only setup\n            const { resourceFromAttributes } = __webpack_require__(/*! @opentelemetry/resources */ \"(instrument)/./node_modules/@opentelemetry/resources/build/esm/index.js\");\n            const { NodeSDK } = __webpack_require__(/*! @opentelemetry/sdk-node */ \"(instrument)/./node_modules/@opentelemetry/sdk-node/build/src/index.js\");\n            const { getNodeAutoInstrumentations } = __webpack_require__(/*! @opentelemetry/auto-instrumentations-node */ \"(instrument)/./node_modules/@opentelemetry/auto-instrumentations-node/build/src/index.js\");\n            const { OTLPTraceExporter } = __webpack_require__(/*! @opentelemetry/exporter-trace-otlp-http */ \"(instrument)/./node_modules/@opentelemetry/exporter-trace-otlp-http/build/esm/index.js\");\n            // Configure the SDK to export telemetry data to OTLP collector\n            const traceExporter = new OTLPTraceExporter({\n                url: 'http://otel-collector:4318/v1/traces'\n            });\n            // Create resource with service information\n            const resource = resourceFromAttributes({\n                'service.name': 'escape-room-frontend',\n                'service.version': '1.0.0'\n            });\n            // Initialize the SDK\n            const sdk = new NodeSDK({\n                resource,\n                traceExporter,\n                instrumentations: [\n                    getNodeAutoInstrumentations({\n                        '@opentelemetry/instrumentation-fs': {\n                            enabled: false\n                        }\n                    })\n                ]\n            });\n            // Start the SDK\n            sdk.start();\n            console.log('OpenTelemetry initialized successfully');\n        } catch (error) {\n            console.log('Failed to initialize OpenTelemetry:', error);\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vaW5zdHJ1bWVudGF0aW9uLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0Q0FBNEM7QUFDNUMsK0NBQStDO0FBRXhDLGVBQWVBO0lBQ3BCLDBDQUEwQztJQUMxQyxJQUFJQyxJQUFxQyxFQUFFO1FBQ3pDLElBQUk7WUFDRkcsUUFBUUMsR0FBRyxDQUFDO1lBRVosZ0NBQWdDO1lBQ2hDLE1BQU0sRUFBRUMsc0JBQXNCLEVBQUUsR0FBR0MsbUJBQU9BLENBQUMseUdBQTBCO1lBQ3JFLE1BQU0sRUFBRUMsT0FBTyxFQUFFLEdBQUdELG1CQUFPQSxDQUFDLHVHQUF5QjtZQUNyRCxNQUFNLEVBQUVFLDJCQUEyQixFQUFFLEdBQUdGLG1CQUFPQSxDQUFDLDJJQUEyQztZQUMzRixNQUFNLEVBQUVHLGlCQUFpQixFQUFFLEdBQUdILG1CQUFPQSxDQUFDLHVJQUF5QztZQUUvRSwrREFBK0Q7WUFDL0QsTUFBTUksZ0JBQWdCLElBQUlELGtCQUFrQjtnQkFDMUNFLEtBQUs7WUFDUDtZQUVBLDJDQUEyQztZQUMzQyxNQUFNQyxXQUFXUCx1QkFBdUI7Z0JBQ3RDLGdCQUFnQjtnQkFDaEIsbUJBQW1CO1lBQ3JCO1lBRUEscUJBQXFCO1lBQ3JCLE1BQU1RLE1BQU0sSUFBSU4sUUFBUTtnQkFDdEJLO2dCQUNBRjtnQkFDQUksa0JBQWtCO29CQUNoQk4sNEJBQTRCO3dCQUMxQixxQ0FBcUM7NEJBQ25DTyxTQUFTO3dCQUNYO29CQUNGO2lCQUNEO1lBQ0g7WUFFQSxnQkFBZ0I7WUFDaEJGLElBQUlHLEtBQUs7WUFFVGIsUUFBUUMsR0FBRyxDQUFDO1FBRWQsRUFBRSxPQUFPYSxPQUFPO1lBQ2RkLFFBQVFDLEdBQUcsQ0FBQyx1Q0FBdUNhO1FBQ3JEO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsiL2FwcC9pbnN0cnVtZW50YXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTmV4dC5qcyBpbnN0cnVtZW50YXRpb24gZm9yIE9wZW5UZWxlbWV0cnlcbi8vIFRoaXMgcnVucyBvbmx5IG9uIHRoZSBzZXJ2ZXIgc2lkZSBpbiBOZXh0LmpzXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlcigpIHtcbiAgLy8gT25seSBydW4gb24gc2VydmVyLXNpZGUgTm9kZS5qcyBydW50aW1lXG4gIGlmIChwcm9jZXNzLmVudi5ORVhUX1JVTlRJTUUgPT09ICdub2RlanMnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgT3BlblRlbGVtZXRyeS4uLicpXG4gICAgICBcbiAgICAgIC8vIFNpbXBsZSBzZXJ2ZXItc2lkZSBvbmx5IHNldHVwXG4gICAgICBjb25zdCB7IHJlc291cmNlRnJvbUF0dHJpYnV0ZXMgfSA9IHJlcXVpcmUoJ0BvcGVudGVsZW1ldHJ5L3Jlc291cmNlcycpXG4gICAgICBjb25zdCB7IE5vZGVTREsgfSA9IHJlcXVpcmUoJ0BvcGVudGVsZW1ldHJ5L3Nkay1ub2RlJylcbiAgICAgIGNvbnN0IHsgZ2V0Tm9kZUF1dG9JbnN0cnVtZW50YXRpb25zIH0gPSByZXF1aXJlKCdAb3BlbnRlbGVtZXRyeS9hdXRvLWluc3RydW1lbnRhdGlvbnMtbm9kZScpXG4gICAgICBjb25zdCB7IE9UTFBUcmFjZUV4cG9ydGVyIH0gPSByZXF1aXJlKCdAb3BlbnRlbGVtZXRyeS9leHBvcnRlci10cmFjZS1vdGxwLWh0dHAnKVxuXG4gICAgICAvLyBDb25maWd1cmUgdGhlIFNESyB0byBleHBvcnQgdGVsZW1ldHJ5IGRhdGEgdG8gT1RMUCBjb2xsZWN0b3JcbiAgICAgIGNvbnN0IHRyYWNlRXhwb3J0ZXIgPSBuZXcgT1RMUFRyYWNlRXhwb3J0ZXIoe1xuICAgICAgICB1cmw6ICdodHRwOi8vb3RlbC1jb2xsZWN0b3I6NDMxOC92MS90cmFjZXMnLFxuICAgICAgfSlcblxuICAgICAgLy8gQ3JlYXRlIHJlc291cmNlIHdpdGggc2VydmljZSBpbmZvcm1hdGlvblxuICAgICAgY29uc3QgcmVzb3VyY2UgPSByZXNvdXJjZUZyb21BdHRyaWJ1dGVzKHtcbiAgICAgICAgJ3NlcnZpY2UubmFtZSc6ICdlc2NhcGUtcm9vbS1mcm9udGVuZCcsXG4gICAgICAgICdzZXJ2aWNlLnZlcnNpb24nOiAnMS4wLjAnLFxuICAgICAgfSlcblxuICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgU0RLXG4gICAgICBjb25zdCBzZGsgPSBuZXcgTm9kZVNESyh7XG4gICAgICAgIHJlc291cmNlLFxuICAgICAgICB0cmFjZUV4cG9ydGVyLFxuICAgICAgICBpbnN0cnVtZW50YXRpb25zOiBbXG4gICAgICAgICAgZ2V0Tm9kZUF1dG9JbnN0cnVtZW50YXRpb25zKHtcbiAgICAgICAgICAgICdAb3BlbnRlbGVtZXRyeS9pbnN0cnVtZW50YXRpb24tZnMnOiB7XG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG5cbiAgICAgIC8vIFN0YXJ0IHRoZSBTREtcbiAgICAgIHNkay5zdGFydCgpXG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKCdPcGVuVGVsZW1ldHJ5IGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseScpXG4gICAgICBcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBpbml0aWFsaXplIE9wZW5UZWxlbWV0cnk6JywgZXJyb3IpXG4gICAgfVxuICB9XG59Il0sIm5hbWVzIjpbInJlZ2lzdGVyIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUlVOVElNRSIsImNvbnNvbGUiLCJsb2ciLCJyZXNvdXJjZUZyb21BdHRyaWJ1dGVzIiwicmVxdWlyZSIsIk5vZGVTREsiLCJnZXROb2RlQXV0b0luc3RydW1lbnRhdGlvbnMiLCJPVExQVHJhY2VFeHBvcnRlciIsInRyYWNlRXhwb3J0ZXIiLCJ1cmwiLCJyZXNvdXJjZSIsInNkayIsImluc3RydW1lbnRhdGlvbnMiLCJlbmFibGVkIiwic3RhcnQiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(instrument)/./instrumentation.ts\n");

/***/ }),

/***/ "(instrument)/./node_modules/@opentelemetry/instrumentation/build/esm/platform/node sync recursive":
/*!***********************************************************************************!*\
  !*** ./node_modules/@opentelemetry/instrumentation/build/esm/platform/node/ sync ***!
  \***********************************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(instrument)/./node_modules/@opentelemetry/instrumentation/build/esm/platform/node sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "async_hooks":
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "diagnostics_channel":
/*!**************************************!*\
  !*** external "diagnostics_channel" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("diagnostics_channel");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "import-in-the-middle":
/*!***************************************!*\
  !*** external "import-in-the-middle" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("import-in-the-middle");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:perf_hooks":
/*!**********************************!*\
  !*** external "node:perf_hooks" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:perf_hooks");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:v8":
/*!**************************!*\
  !*** external "node:v8" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:v8");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "perf_hooks":
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("perf_hooks");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "require-in-the-middle":
/*!****************************************!*\
  !*** external "require-in-the-middle" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("require-in-the-middle");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@opentelemetry","vendor-chunks/@grpc","vendor-chunks/protobufjs","vendor-chunks/uuid","vendor-chunks/readable-stream","vendor-chunks/@protobufjs","vendor-chunks/gaxios","vendor-chunks/whatwg-url","vendor-chunks/triple-beam","vendor-chunks/debug","vendor-chunks/winston-transport","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/forwarded-parse","vendor-chunks/tr46","vendor-chunks/inherits","vendor-chunks/https-proxy-agent","vendor-chunks/gcp-metadata","vendor-chunks/agent-base","vendor-chunks/node-fetch","vendor-chunks/long","vendor-chunks/webidl-conversions","vendor-chunks/util-deprecate","vendor-chunks/supports-color","vendor-chunks/string_decoder","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.camelcase","vendor-chunks/is-stream","vendor-chunks/has-flag","vendor-chunks/extend","vendor-chunks/bignumber.js","vendor-chunks/@js-sdsl"], () => (__webpack_exec__("(instrument)/./instrumentation.ts")));
module.exports = __webpack_exports__;

})();