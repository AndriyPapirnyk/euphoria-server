import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    sendData() {
        return "Hello from server"
    }
}
