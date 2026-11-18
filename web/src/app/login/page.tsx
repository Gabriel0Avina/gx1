import Link from "next/link";
import type { Metadata } from 'next';
import { configured } from '@/lib/dashboard/server';
import LoginForm from '@/components/dashboard/LoginForm';
import '../dashboard/dashboard.css';
export const metadata:Metadata={title:'Entrar · GX1',robots:{index:false,follow:false},alternates:{canonical:null}};
export default function Login() { return <main className="gx-login"><Link className="gx-wordmark" href="/">GX1</Link><h1>Tu espacio de trabajo</h1><p>Un lugar para avanzar, revisar y continuar.</p><LoginForm configured={configured()}/><a href="/dashboard/demo">Explorar con datos de ejemplo →</a><small>La vista de ejemplo no guarda cambios al salir.</small></main>; }

