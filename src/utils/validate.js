/* 是否为邮箱*/
export function validateEMail(rule, value, callback) {
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的邮箱地址'))
    } else {
      callback()
    }
  }
}

/* 是否为邮编*/
export function validatePostCode(rule, value, callback) {
  const reg = /^[0-9]{6}$/;
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的邮政编码'))
    } else {
      callback()
    }
  }
}
