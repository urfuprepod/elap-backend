import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
  } from 'class-validator';
  
  // Реализация логики валидации
  @ValidatorConstraint({ name: 'isUrfuEmail', async: false })
  export class IsUrfuEmailConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
      // Проверяем, что строка содержит только буквы
      const splitted = value.split('@').at(-1)
      if (!splitted) return false
      return /^urfu\.(ru|me)$/.test(splitted)
    }
  
    defaultMessage(args: ValidationArguments) {
      // Сообщение об ошибке
      return 'Почта должна быть указана только в домене @urfu.ru или @urfu.me';
    }
  }
  
  // Создаем кастомный декоратор
  export function IsUrfuEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUrfuEmailConstraint,
      });
    };
  }