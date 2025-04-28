import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'; // DTO for creating a user

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Additional methods as needed (updateUser, deleteUser, etc.)

  // Find a user by ID
  async findById(id: number): Promise<User | null | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
    // Update a user
  }
  async updateUser(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }
  // Delete a user by ID
  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
