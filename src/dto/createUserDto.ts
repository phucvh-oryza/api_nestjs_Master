export class CreateUserDto {
  readonly Password: string;
  readonly Fullname: string;
  readonly Email: string;
  readonly Birthday: string;
  readonly RoleID: string;
  readonly Status: boolean;
}
