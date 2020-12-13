export default ({ _ }, inject) => {
  const utilities = {
    guid: () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
        c
      ) {
        // eslint-disable-next-line
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    sortObjects: (data, attr) => {
      const arr = []
      for (const prop in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(prop)) {
          const obj = {}
          obj[prop] = data[prop]
          obj.tempSortName = data[prop][attr].toLowerCase()
          arr.push(obj)
        }
      }

      arr.sort(function (a, b) {
        const at = a.tempSortName
        const bt = b.tempSortName
        return at > bt ? 1 : at < bt ? -1 : 0
      })

      const result = []
      for (let i = 0, l = arr.length; i < l; i++) {
        const obj = arr[i]
        delete obj.tempSortName
        for (const prop in obj) {
          // eslint-disable-next-line no-prototype-builtins
          if (obj.hasOwnProperty(prop)) {
            // eslint-disable-next-line no-var
            var id = prop
          }
        }
        const item = obj[id]
        result.push(item)
      }
      return result
    },
    convertArray(obj) {
      const arr = Object.keys(obj).map((key) => obj[key])
      // eslint-disable-next-line
      console.log(arr)
      return arr
    },
    sortKeys: (obj) => {
      return Object.assign(
        ...Object.entries(obj)
          .sort()
          .map(([key, value]) => {
            return {
              [key]: value,
            }
          })
      )
    },
  }
  inject('utilities', utilities)
}
