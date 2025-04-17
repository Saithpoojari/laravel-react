import React from "react";
import { Link } from "@inertiajs/react";

import HomeLayout from "../layout/HomeLayout";
function About({name}){
    return (
       <>
       <h1>AboutPage</h1>
       <p>Hello {name}</p>
       <Link preserveScroll href="/" className="block title mt-[1000px]">{new Date().toTimeString()}</Link>
       </>
    )
}
About.layout=page => <HomeLayout children={page}/>
export default About;