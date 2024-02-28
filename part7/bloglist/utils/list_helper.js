const dummy = (blogs) => {
    return 1
  }

 const totalLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }
    else{
    return blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes, 0)
    }
 } 

 const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return null
        
    }
    else if(blogs.length === 1) {
        return blogs[0]
    }
    else {
        let fav = blogs[0]
        for(const blog of blogs){
            if(blog.likes > fav.likes) {
                fav = blog
            }
        }
        return fav
    }
 }

 const mostBlogs = (blogs) => {
    const authors = Array.from(new Set(blogs.flatMap(blog => blog.author)))
    const blogCounts = new Array(authors.length).fill(0)
    for(const blog of blogs){
        const indexOfAuthor = authors.indexOf(blog.author)
        blogCounts[indexOfAuthor] += 1
    }
    const biggestBlogCountIndex = blogCounts.indexOf(Math.max(...blogCounts))
    return({author: authors[biggestBlogCountIndex], blogs: blogCounts[biggestBlogCountIndex]})
 }

 const mostLikes = (blogs) => {
    const authors = Array.from(new Set(blogs.flatMap(blog => blog.author)))
    const likes = new Array(authors.length).fill(0)
    for(const blog of blogs){
        const indexOfAuthor = authors.indexOf(blog.author)
        console.log(indexOfAuthor)
        likes[indexOfAuthor] += blog.likes
    }
    const biggestLikesIndex = likes.indexOf(Math.max(...likes))
    return({author: authors[biggestLikesIndex], likes: likes[biggestLikesIndex]})
 }
  
  module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog, 
    mostBlogs,
    mostLikes
  }