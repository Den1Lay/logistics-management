export {default as createFilter} from './filters'
export {default as mineInd} from './mineInd';
export const checkPhone = phone => /^([+]?[0-9\s-\(\)]{3,25})*$/i.test(phone);
export function getPlaceholder(type) {
  switch(type) {
    case 'number':
    return 'Номер заявки'
    case 'date':
    return 'Дата получения заявки'
    case 'firm':
    return 'Фирма клиента'
    case 'comment':
    return 'Комментарий'
    case 'carrier':
    return 'Фамилия и имя'
    default: 
    return 'Что-то необычное'
  }
}