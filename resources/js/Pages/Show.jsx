import React from "react";
import ShowLayout from "../layout/ShowLayout";
import './Page.css'

function show({ post }) {
    return (
        

            <div className="show">
                <h2 className="Blogtitle">Blog ID {post.id}</h2>
                <h1 className="title flex justify-center para">{post.body}</h1>
            </div>
         )

}
// Show.layout=page => <ShowLayout children={page}/>
export default show;