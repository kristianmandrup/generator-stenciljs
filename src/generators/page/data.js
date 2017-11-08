export function pageData(props) {
  const {
    routeStr
  } = props

  if (routeStr) {
    routeList = routeStr.split(',').filter(name => !name.isBlank())
    routeMap = routeList.reduce((acc, route) => {
      let [componentName, url, exact, props] = route.split(':')
      // always reference tag name of component
      componentName = componentName.dasherize()
      // ensure path always starts with a /
      if (url[0] !== '/') {
        url = '/' + url
      }
      // reverse if reverse order detected
      if (/[{}]/.test(exact) || /[false|true]/.test(props)) {
        [exact, props] = [props, exact]
      }

      acc[component] = {
        url,
        exact,
        props
      }
      return acc
    }, {})
  }

  const routeNames = Object.keys(routeMap)
  const routeTags = routeNames.map(name => {
    let {
      component,
      url,
      props,
      exact
    } = routeMap[name]
    exact = exact || 'false'
    let route = [`    <stencil-route url="${path}" component="${component}" />`]
    if (props) {
      route.push(`componentProps="${props}"`)
    }
    if (exact) {
      route.push(`exact="${exact}"`)
    }
    return route.join(' ')
  }).join('\n')

  return {
    routeTags
  }
}
