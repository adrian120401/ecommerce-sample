import { Body, Controller, Delete, Get, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAll(@Req() req: Request) {
        return this.userService.getAll(req);
    }

    @Get('me')
    getMe(@Req() req: Request) {
        return this.userService.getMe(req);
    }

    @Patch('me')
    updateMe(@Req() req: Request, @Body() dto: UpdateUserDto) {
        return this.userService.updateMe(req, dto);
    }

    @Delete('me')
    deleteMe(@Req() req: Request) {
        return this.userService.deleteMe(req);
    }
}
