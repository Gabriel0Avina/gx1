import type { Metadata } from 'next';
import './dashboard.css';
export const metadata:Metadata={title:'GX1 · Tu espacio de trabajo',description:'Espacio privado de trabajo GX1.',robots:{index:false,follow:false},alternates:{canonical:null}};
export default function Layout({children}:{children:React.ReactNode}) { return children; }
