import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role/role.enum';

export const HasRoles = (...roleID: Role[]) => SetMetadata('roleID', roleID);
