const  _regQ = /^\${1}/
const _buildInQuery = ['select', 'where', 'order', 'group']

const queryHelper = {
  queryParser: function(query) {
    const _q = {}
    for (key in query) {
      // see if this query is valid starting with single $
      if (key.match(_regQ)) {
        // see if this is a valid query, only select, where, order, group allowed
        if (_buildInQuery.includes(key.slice(1))) {
          if (!_q[key.slice(1)]) _q[key.slice(1)] = undefined;
          switch (key.slice(1)) {
            case 'select':
              _q.select = query[key].split(',')
              break
            case 'where':
              _q.where = query[key].split(',')
              _q.where = _q.where.map(function(option){
                if (option.slice(0,4) === 'name') {
                  const i = option.indexOf('=');
                  return option.slice(0, i) + '=\'' + option.slice(i + 1) + '\'';
                } else {
                  return option;
                }
              })
              break
            case 'order':
              const _orderOption = query[key].split(',')
              _q.order = {} 
              _q.order[_orderOption[0]] = _orderOption[1]
              break
            case 'group':
              _q.group = query[key].split(',')
              break
          }
        }
      }
    }
    return new Promise((resolve, reject) => {
      resolve(_q)
    })
  },

  queryBuilder: function(qObj) {
    console.log(qObj)
    let _rawQuery = "";

    // building select clause
    if (qObj.select) {
      _rawQuery = `${_rawQuery} SELECT `;
      qObj.select.forEach(function(column, i) {
        _rawQuery = `${_rawQuery} ${column}` 
        if (qObj.select[i + 1]) {
          _rawQuery = `${_rawQuery}, `
        }
      })
      _rawQuery = `${_rawQuery} FROM communities`;
    } else {
      _rawQuery = 'SELECT * FROM communities';
    }

    // building where clause
    if (qObj.where) {
      _rawQuery = `${_rawQuery} WHERE `;
      qObj.where.forEach(function(condition, i){
        _rawQuery = `${_rawQuery} ${condition}`
        if (qObj.where[i + 1]) {
          _rawQuery = `${_rawQuery} and `
        }
      })
    }

    // building order clause - only order by one thing
    if (qObj.order) {
      _rawQuery = `${_rawQuery} ORDER BY ${Object.keys(qObj.order)[0]} ${qObj.order[Object.keys(qObj.order)[0]]}`
    }
    
    return new Promise(function(resolve, reject){
      resolve(_rawQuery)
    })
  },
}

module.exports = queryHelper;