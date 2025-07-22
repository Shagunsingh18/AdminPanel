// src/ErrorBoundary.jsx
import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="p-8 text-red-700 bg-red-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🚨 Unexpected Error</h1>

      {isRouteErrorResponse(error) ? (
        <>
          <h2 className="text-xl">
            {error.status} {error.statusText}
          </h2>
          {error.data && (
            <pre className="mt-2 p-2 bg-white border rounded">
              {JSON.stringify(error.data, null, 2)}
            </pre>
          )}
        </>
      ) : (
        <>
          <p>{error?.message || "An unknown error occurred."}</p>
          <pre className="mt-4 bg-white p-3 rounded text-sm text-gray-800 overflow-x-auto">
            {error?.stack}
          </pre>
        </>
      )}
    </div>
  );
}
