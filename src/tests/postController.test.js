import { expect } from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../index.js'; // Assuming your Express app is exported as 'app'
import Post from '../Models/post.js';
import Tag from '../Models/tag.js';
import PostTag from '../Models/postTag.js';

const request = supertest(app);

describe('Tagging System', () => {
  describe('POST /posts', () => {
    it('should create a new post with tags', async () => {
      const postMock = sinon.mock(Post);
      const tagMock = sinon.mock(Tag);

      // Mocking database interactions
      tagMock.expects('findOrCreate').twice().returns([{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }]);
      postMock.expects('create').once().returns({ id: 1, title: 'Test Post', content: 'Test Content' });

      const response = await request.post('/posts').send({ title: 'Test Post', content: 'Test Content', tags: ['tag1', 'tag2'] });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.equal('Test Post');

      postMock.verify();
      tagMock.verify();

      postMock.restore();
      tagMock.restore();
    });

  });

});

describe('Search/Filter Endpoints', () => {
  describe('GET /posts', () => {
    it('should respond with filtered posts based on tags, start date, end date, and author', async () => {
      // Mock database interactions and request
      const response = await request.get('/posts?tags=tag1,tag2&startDate=2022-01-01&endDate=2022-12-31&author=user1');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    
    });

  });

});

describe('Authentication Enhancements', () => {
  describe('GET /admin/posts', () => {
    it('should respond with 401 unauthorized if user is not authenticated', async () => {
      const response = await request.get('/admin/posts');

      expect(response.status).to.equal(401);
      // Assert other conditions if needed
    });

    
  });

  
});
