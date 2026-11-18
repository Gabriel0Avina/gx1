'use client';
export default function ErrorPage({reset}:{reset:()=>void}) { return <main className="gx-login"><h1>No pudimos abrir tu espacio</h1><p>Tus datos no se han modificado. Revisa la conexión e inténtalo de nuevo.</p><button onClick={reset}>Volver a intentar</button><a href="/login">Volver a iniciar sesión</a></main>; }
