import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
    constructor(message?: string, error?: Error) {
        if (error) console.log(error);
        super(message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message?: string, error?: Error) {
        if (error) console.log(error);
        super(message || 'Unauthorized', HttpStatus.UNAUTHORIZED);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message?: string, error?: Error) {
        if (error) console.log(error);
        super(message || 'Foribidden', HttpStatus.FORBIDDEN);
    }
}

export class BadRequestException extends HttpException {
    constructor(message?: string, error?: Error) {
        if (error) console.log(error);
        super(message || 'Bad Request', HttpStatus.BAD_REQUEST);
    }
}

export class NotFoundException extends HttpException {
    constructor(message?: string, error?: Error) {
        if (error) console.log(error);
        super(message || 'Bad Request', HttpStatus.NOT_FOUND);
    }
}
