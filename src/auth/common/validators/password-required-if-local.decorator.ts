import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function PasswordRequiredIfLocal(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'passwordRequiredIfLocal',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(password: any, args: ValidationArguments) {
          const type = (args.object as any).type;

          if (type === 'local') {
            return typeof password === 'string' && password.length >= 6;
          }

          return true;
        },

        defaultMessage(args: ValidationArguments) {
          return 'Password is required and must be at least 6 characters long if the user type is "local".';
        },
      },
    });
  };
}
