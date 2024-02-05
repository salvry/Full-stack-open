import { useState } from 'react'

const BlogForm = ({ title, author, url, titleChange, authorChange, urlChange, handleSubmit }) => {

    return (
        <div>
            <h2>New blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Title
                    <input value={title} onChange={titleChange} />
                </div>
                <div>
                    Author
                    <input value={author} onChange={authorChange} />
                </div>
                <div>
                    URL
                    <input value={url} onChange={urlChange} />
                </div>
                <button type="submit">Add</button>
            </form>
        </div >
    )
}
export default BlogForm