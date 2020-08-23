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
  }
}