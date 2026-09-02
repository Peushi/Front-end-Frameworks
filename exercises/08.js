// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 8 — async/await
// Run this file in the browser console or with Node 18+.

const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. Write an async function fetchPosts() that:
//    - fetches BASE_URL + "/posts"
//    - parses the JSON response
//    - returns the first 5 items
//    - logs each item's title

// 2. Add try/catch to fetchPosts().
//    If the fetch fails, log "Failed to load posts".
const fetchPosts = async () => {
  try {
    const res = await fetch(BASE_URL + "/posts");
    const posts = await res.json();

    const firstFive = posts.slice(0, 5);

    firstFive.forEach((post) => console.log(post.title));

    return firstFive;
  } catch (error) {
    console.log("Failed to load posts");
  }
};

// 3. Write an async function getPostById(id) that:
//    - fetches BASE_URL + "/posts/" + id
//    - throws an Error if res.ok is false
//    - returns the parsed JSON object
const getPostById = async (id) => {
  const res = await fetch(BASE_URL + "/posts/" + id);

  if (!res.ok) {
    throw new Error("Failed to load post");
  }

  return await res.json();
};

// Call getPostById(1) and log the result.
// Call getPostById(99999) — what happens? Handle it.
const run = async () => {
  try {
    const posts = await fetchPosts();
    console.log(posts);
  } catch (error) {
    console.log(error.message);
  }

  try {
    const post = await getPostById(1);
    console.log(post);
  } catch (error) {
    console.log(error.message);
  }

  try {
    const invalidPost = await getPostById(99999);
    console.log(invalidPost);
  } catch (error) {
    console.log(error.message);
  }
};

run();
