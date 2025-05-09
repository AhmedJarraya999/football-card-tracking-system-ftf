import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register a new user (POST /users)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  // Register a new user (POST /users/register)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.register(createUserDto);
  }

  // Login a user (POST /users/login)
  @Post('login')
  async login(
    @Body() loginCredentials: { email: string; password: string },
  ): Promise<{ token: string }> {
    const { email, password } = loginCredentials;
    const result = await this.userService.login(email, password);
    if (!result) {
      throw new NotFoundException('Invalid login credentials');
    }
    return { token: result.accessToken };
  }
  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // Get user by ID (GET /users/id/:id)
  @Get('id/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Get all users (GET /users)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  // Update user by ID (PUT /users/:id)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }
  // Delete user by ID (DELETE /users/:id)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userService.deleteUser(id);
  }
}
