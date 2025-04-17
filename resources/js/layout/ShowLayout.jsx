import React, { Children } from "react"; 
export default function HomeLayout({children}){
    return (
        <>
        <header> <nav><h1>posttt</h1></nav></header>
    
                    <main>
                        {children}
                    </main>
                    </>
    )
}