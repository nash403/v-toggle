export default {
  bind(el, binding, vnode) {
    let boundValue = binding.value
    let holder = boundValue ? vnode.context : el.dataset
    let classNames = Object.keys(binding.modifiers)
    toggleClasses(
      el,
      classNames,
      boundValue ? !!holder[boundValue] : !!holder.toggleValue
    )
    const listener = handler.bind(null, { boundValue, holder, el, classNames })
    el.removeEventListener('click', listener)
    el.addEventListener('click', listener, false)
  },
  unbind(el) {
    delete el.dataset.toggleValue
  }
}

function toggleClasses(el, classes, val) {
  if (val) {
    el.classList.add(...classes)
  } else {
    el.classList.remove(...classes)
  }
}

function handler({ boundValue, holder, el, classNames }) {
  try {
    if (boundValue) {
      holder[boundValue] = !holder[boundValue]
      toggleClasses(el, classNames, !!holder[boundValue])
      return
    }
  } catch (e) {}
  holder.toggleValue = holder.toggleValue ? '' : 'true'
  toggleClasses(el, classNames, !!holder.toggleValue)
}
