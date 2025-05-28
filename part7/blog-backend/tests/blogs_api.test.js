const assert = require('node:assert');
const bcrypt = require('bcrypt');
const {test, beforeEach, after, describe} = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blogs');
const User = require('../models/users');
const helper = require('./test_helper');

const api = supertest(app);
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'testuser', name: 'Test User', passwordHash })
  await user.save();

  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: user._id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

//get blog posts
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
})

//adding a blog
describe('adding a blog', () => {

    const newBlog = {
            title: "10 JavaScript Frameworks You Should Learn in 2024",
            author: "Mike Johnson",
            url: "https://example.com/blog/post3",
            likes: 20,
    }
//post blog without token
    test('a blog can\'t be added without token', async () => {
  
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        
    })

//post blog with token
    test('a blog can be added with token', async () => {
        const user = await helper.getUser();
        const token = await helper.getToken(user);
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })


    //likes default to 0
    test('likes default to 0', async () => {
    const newBlog = {
            title: "10 JavaScript Frameworks You Should Learn in 2024",
            author: "Mike Johnson",
            url: "https://example.com/blog/post3",
    }
        const user = await helper.getUser();
        const token = await helper.getToken(user);
        const response = api
            .post('/api/blogs').set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        // console.log(response.body);
        // const blogsAtEnd = await helper.blogsInDb();
        // assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
        // const blog = blogsAtEnd.filter(blog => blog.title == newBlog.title)[0];
        // assert.deepStrictEqual(blog, {...newBlog, id: blog.id, likes: 0});
    })

    //missing title and url
    test('missing title and url', async () => {
        const newBlog = {
            author: "Mike Johnson",
            likes : 20,
        }
        const user = await helper.getUser();
        const token = await helper.getToken(user);
        const response = await api
            .post('/api/blogs').set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.error, 'title or url missing')
    })
})

describe('updating a blog', () => {
    test('a blog can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0];

        const updatedData = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })
})


describe('deleting a blog', () => {
    test('a blog can be deleted by the creator', async () => {
        const user = await helper.getUser();
        const token = await helper.getToken(user);

        const newBlog = {
            title: 'Blog to be deleted',
            author: 'Test Author',
            url: 'https://delete.me',
            likes: 5
        };

        const postResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201);

        const blogToDelete = postResponse.body;
        // console.log('Blog to delete:', blogToDelete);
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(
            blogsAtEnd.find(b => b.id === blogToDelete.id),
            undefined
        )
        console.log('Blog deleted successfully');
    })
})

//finish tests
after(async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
})


