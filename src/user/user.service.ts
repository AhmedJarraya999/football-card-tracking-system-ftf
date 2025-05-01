import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'; // DTO for creating a user
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  // Find all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Register a new user
  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  // Login a user
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string } | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    return null;
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ?? undefined;
  }

  // Find a user by ID
  async findById(id: number): Promise<User | undefined> {
    return (await this.userRepository.findOne({ where: { id } })) ?? undefined;
  }
  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }
  // Update a user's information
  async updateUser(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
