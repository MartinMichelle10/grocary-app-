import { Test } from '@nestjs/testing';
import { AuthService } from '../modules/auth/auth.service';
import { UsersService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

describe('AuthService', () => {
  let auth: AuthService;
  const mockUsers = { validateUser: jest.fn(), register: jest.fn() } as any;
  const mockJwt = { signAsync: jest.fn().mockResolvedValue('token') } as any;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsers },
        { provide: JwtService, useValue: mockJwt },
        ConfigService,
      ],
    }).compile();
    auth = module.get(AuthService);
  });

  it('login returns token when credentials valid', async () => {
    mockUsers.validateUser.mockResolvedValue({ id: 'u1', email: 'a@b' });
    const res = await auth.login('a@b', 'pass');
    expect(res).toHaveProperty('access_token', 'token');
  });
});
