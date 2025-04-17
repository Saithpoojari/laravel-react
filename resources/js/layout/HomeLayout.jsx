import React, { Children } from "react"; 
export default function HomeLayout({children}){
    return (
        <>
        <header>
            <nav className= 'bg-yellow-500'>
                <a href="">Home
                    </a></nav></header>
                    <main>
                        {children}
                    </main>
                    </>
    )
}