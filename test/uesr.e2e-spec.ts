import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
// Update the path below if your UserController is in a different location
import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user.service';
import { User } from '../src//user/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService = {
    createUser: jest.fn(),
    register: jest.fn(),
    login: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  const user: User = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
    name: 'Test User',
    username: 'testuser',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  describe('/users (POST)', () => {
    it('should create a user', async () => {
      userService.createUser.mockResolvedValue(user);
      return request(app.getHttpServer())
        .post('/users')
        .send({ email: user.email, password: 'password', name: user.name })
        .expect(201)
        .expect((res) => {
          expect(res.body.email).toBe(user.email);
        });
    });
  });

  describe('/users/register (POST)', () => {
    it('should register a user', async () => {
      userService.register.mockResolvedValue(user);
      return request(app.getHttpServer())
        .post('/users/register')
        .send({ email: user.email, password: 'password', name: user.name })
        .expect(201)
        .expect((res) => {
          expect(res.body.email).toBe(user.email);
        });
    });
  });

  describe('/users/login (POST)', () => {
    it('should login and return a token', async () => {
      userService.login.mockResolvedValue({ accessToken: 'jwt-token' });
      return request(app.getHttpServer())
        .post('/users/login')
        .send({ email: user.email, password: 'password' })
        .expect(201)
        .expect((res) => {
          expect(res.body.accessToken).toBe('jwt-token');
        });
    });

    it('should return 404 for invalid credentials', async () => {
      userService.login.mockResolvedValue(null);
      return request(app.getHttpServer())
        .post('/users/login')
        .send({ email: user.email, password: 'wrong' })
        .expect(404);
    });
  });

  describe('/users/:email (GET)', () => {
    it('should get user by email', async () => {
      userService.findByEmail.mockResolvedValue(user);
      return request(app.getHttpServer())
        .get(`/users/${user.email}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe(user.email);
        });
    });

    it('should return 404 if user not found', async () => {
      userService.findByEmail.mockResolvedValue(null);
      return request(app.getHttpServer())
        .get(`/users/unknown@example.com`)
        .expect(404);
    });
  });

  describe('/users/id/:id (GET)', () => {
    it('should get user by id', async () => {
      userService.findById.mockResolvedValue(user);
      return request(app.getHttpServer())
        .get(`/users/id/${user.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(user.id);
        });
    });

    it('should return 404 if user not found', async () => {
      userService.findById.mockResolvedValue(null);
      return request(app.getHttpServer()).get(`/users/id/999`).expect(404);
    });
  });

  describe('/users (GET)', () => {
    it('should get all users', async () => {
      userService.findAll.mockResolvedValue([user]);
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body[0].email).toBe(user.email);
        });
    });
  });

  describe('/users/:id (PUT)', () => {
    it('should update user by id', async () => {
      userService.updateUser.mockResolvedValue({ ...user, name: 'Updated' });
      return request(app.getHttpServer())
        .put(`/users/${user.id}`)
        .send({ name: 'Updated' })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe('Updated');
        });
    });

    it('should return 404 if user not found', async () => {
      userService.updateUser.mockResolvedValue(null);
      return request(app.getHttpServer())
        .put(`/users/999`)
        .send({ name: 'Updated' })
        .expect(404);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete user by id', async () => {
      userService.findById.mockResolvedValue(user);
      userService.deleteUser.mockResolvedValue(undefined);
      return request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .expect(200);
    });

    it('should return 404 if user not found', async () => {
      userService.findById.mockResolvedValue(null);
      return request(app.getHttpServer()).delete(`/users/999`).expect(404);
    });
  });
});
