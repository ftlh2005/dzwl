const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//数组去重
const unique = arr =>{ 
  let newArr = []
    for(let i = 0, len = arr.length; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        // 如果重复，则i向前推进，但不管重复项
        if (arr[i] == arr[j]) j = ++i
      }
      // 将没有重复项的推入到新数组
      newArr.push(arr[i])
    }
    return newArr
}

module.exports = {
  formatTime: formatTime,
  unique: unique
}
