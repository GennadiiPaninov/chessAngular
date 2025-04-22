export const ERROR_MESSAGES: Record<string, (e:any)=> string> = {
  required: ()=>'Обязательное поле*',
  email: ()=> "Не корректный email",
  minlength: (e)=>`Минимум ${e.requiredLength} символов`,
  maxlength: (e) => `Максимум ${e.requiredLength} символов`,
  pattern: () => 'Неверный формат',
  passwordsMismatch: () => 'Пароли не совпадают',
  capitalLetter: ()=> 'Должна присутствовать заглавная буква',
  smallLetter: ()=> 'Должна присутствовать строчная буква',
  number: ()=> 'Должна присутствовать одна цифра'
}
