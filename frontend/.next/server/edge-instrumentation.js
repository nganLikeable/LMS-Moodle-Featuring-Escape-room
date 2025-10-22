// runtime can't be in strict mode because a global variable is assign and maybe created.
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["instrumentation"],{

/***/ "(instrument)/./instrumentation.ts":
/*!****************************!*\
  !*** ./instrumentation.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n// Next.js instrumentation for OpenTelemetry\n// This runs only on the server side in Next.js\nasync function register() {\n    // Only run on server-side Node.js runtime\n    if (false) {}\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vaW5zdHJ1bWVudGF0aW9uLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0Q0FBNEM7QUFDNUMsK0NBQStDO0FBRXhDLGVBQWVBO0lBQ3BCLDBDQUEwQztJQUMxQyxJQUFJQyxLQUFxQyxFQUFFLEVBMEMxQztBQUNIIiwic291cmNlcyI6WyIvYXBwL2luc3RydW1lbnRhdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOZXh0LmpzIGluc3RydW1lbnRhdGlvbiBmb3IgT3BlblRlbGVtZXRyeVxuLy8gVGhpcyBydW5zIG9ubHkgb24gdGhlIHNlcnZlciBzaWRlIGluIE5leHQuanNcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICAvLyBPbmx5IHJ1biBvbiBzZXJ2ZXItc2lkZSBOb2RlLmpzIHJ1bnRpbWVcbiAgaWYgKHByb2Nlc3MuZW52Lk5FWFRfUlVOVElNRSA9PT0gJ25vZGVqcycpIHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBPcGVuVGVsZW1ldHJ5Li4uJylcbiAgICAgIFxuICAgICAgLy8gU2ltcGxlIHNlcnZlci1zaWRlIG9ubHkgc2V0dXBcbiAgICAgIGNvbnN0IHsgcmVzb3VyY2VGcm9tQXR0cmlidXRlcyB9ID0gcmVxdWlyZSgnQG9wZW50ZWxlbWV0cnkvcmVzb3VyY2VzJylcbiAgICAgIGNvbnN0IHsgTm9kZVNESyB9ID0gcmVxdWlyZSgnQG9wZW50ZWxlbWV0cnkvc2RrLW5vZGUnKVxuICAgICAgY29uc3QgeyBnZXROb2RlQXV0b0luc3RydW1lbnRhdGlvbnMgfSA9IHJlcXVpcmUoJ0BvcGVudGVsZW1ldHJ5L2F1dG8taW5zdHJ1bWVudGF0aW9ucy1ub2RlJylcbiAgICAgIGNvbnN0IHsgT1RMUFRyYWNlRXhwb3J0ZXIgfSA9IHJlcXVpcmUoJ0BvcGVudGVsZW1ldHJ5L2V4cG9ydGVyLXRyYWNlLW90bHAtaHR0cCcpXG5cbiAgICAgIC8vIENvbmZpZ3VyZSB0aGUgU0RLIHRvIGV4cG9ydCB0ZWxlbWV0cnkgZGF0YSB0byBPVExQIGNvbGxlY3RvclxuICAgICAgY29uc3QgdHJhY2VFeHBvcnRlciA9IG5ldyBPVExQVHJhY2VFeHBvcnRlcih7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9vdGVsLWNvbGxlY3Rvcjo0MzE4L3YxL3RyYWNlcycsXG4gICAgICB9KVxuXG4gICAgICAvLyBDcmVhdGUgcmVzb3VyY2Ugd2l0aCBzZXJ2aWNlIGluZm9ybWF0aW9uXG4gICAgICBjb25zdCByZXNvdXJjZSA9IHJlc291cmNlRnJvbUF0dHJpYnV0ZXMoe1xuICAgICAgICAnc2VydmljZS5uYW1lJzogJ2VzY2FwZS1yb29tLWZyb250ZW5kJyxcbiAgICAgICAgJ3NlcnZpY2UudmVyc2lvbic6ICcxLjAuMCcsXG4gICAgICB9KVxuXG4gICAgICAvLyBJbml0aWFsaXplIHRoZSBTREtcbiAgICAgIGNvbnN0IHNkayA9IG5ldyBOb2RlU0RLKHtcbiAgICAgICAgcmVzb3VyY2UsXG4gICAgICAgIHRyYWNlRXhwb3J0ZXIsXG4gICAgICAgIGluc3RydW1lbnRhdGlvbnM6IFtcbiAgICAgICAgICBnZXROb2RlQXV0b0luc3RydW1lbnRhdGlvbnMoe1xuICAgICAgICAgICAgJ0BvcGVudGVsZW1ldHJ5L2luc3RydW1lbnRhdGlvbi1mcyc6IHtcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSlcblxuICAgICAgLy8gU3RhcnQgdGhlIFNES1xuICAgICAgc2RrLnN0YXJ0KClcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coJ09wZW5UZWxlbWV0cnkgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5JylcbiAgICAgIFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIGluaXRpYWxpemUgT3BlblRlbGVtZXRyeTonLCBlcnJvcilcbiAgICB9XG4gIH1cbn0iXSwibmFtZXMiOlsicmVnaXN0ZXIiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9SVU5USU1FIiwiY29uc29sZSIsImxvZyIsInJlc291cmNlRnJvbUF0dHJpYnV0ZXMiLCJyZXF1aXJlIiwiTm9kZVNESyIsImdldE5vZGVBdXRvSW5zdHJ1bWVudGF0aW9ucyIsIk9UTFBUcmFjZUV4cG9ydGVyIiwidHJhY2VFeHBvcnRlciIsInVybCIsInJlc291cmNlIiwic2RrIiwiaW5zdHJ1bWVudGF0aW9ucyIsImVuYWJsZWQiLCJzdGFydCIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(instrument)/./instrumentation.ts\n");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("(instrument)/./instrumentation.ts"));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES).middleware_instrumentation = __webpack_exports__;
/******/ }
]);