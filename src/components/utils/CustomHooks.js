import { useState, useRef, useLayoutEffect } from 'react'

const isBrowser = typeof window !== `undefined`

const useSignUpForm = (initialState, callback) => {
  const [inputs, setInputs] = useState(initialState)

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    callback()
  }

  const handleInputChange = (event) => {
    if (event.custom) {
      setInputs((inputs) => ({ ...inputs, [event.name]: event.value }))
    } else {
      event.persist()
      setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }))
    }
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
}

const getScrollPosition = ({ element, useWindow }) => {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body

  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

const useScrollPosition = (effect, deps, element, useWindow, wait, scrollElement) => {
  const position = useRef(getScrollPosition({ useWindow }))

  let throttleTimeout = null

  const callBack = () => {
    if (element.current) {

      const currPos = getScrollPosition({ element, useWindow })
      effect({ prevPos: position.current, currPos })
      position.current = currPos
      throttleTimeout = null
    }
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    scrollElement && scrollElement ?
      scrollElement.addEventListener('scroll', handleScroll, true) : window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}

export {
  useSignUpForm,
  useScrollPosition
}