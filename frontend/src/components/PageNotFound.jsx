import React, { Component, Suspense } from "react";

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <p> Pagina no encontrada</p>
      </div>
    );
  }
}

export default function App() {
  return (
    <Suspense fallback="loading">
      <PageNotFound />
    </Suspense>
  );
}
