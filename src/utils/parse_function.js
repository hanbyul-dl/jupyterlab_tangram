function functionRegex() {
  return /^(function)?\s*([\w$]*)\s*\(([\w\s,$]*)\)\s*(\{([\w\W\s\S]*)\})?/;
}

export function parseFunction(fn) {
  if (typeof fn === 'function') {
    fn = String(fn);
  }

  var fnParts = fn.match(functionRegex());
  var params = fnParts[3] || '';
  var args = params ? params.split(/\s*\,\s*/) : [];

  return {
    name: fnParts[2] || 'anonymous',
    params: params,
    args: args,
    body: fnParts[5] || '',
    called: fnParts[1] !== 'function',
    defn: fnParts[1] === 'function'
  };
}
