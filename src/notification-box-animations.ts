export const animationsVariants = {
  fade: {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  },
  grow: {
    hidden: {
      scale: 0,
    },
    show: {
      scale: 1,
    },
  },
  'slide-left': {
    hidden: {
      x: -368,
    },
    show: {
      x: 0,
    },
  },
  'slide-right': {
    hidden: {
      x: 368,
    },
    show: {
      x: 0,
    },
  },
  collapse: {
    hidden: {
      scaleY: 0,
    },
    show: {
      scaleY: 1,
    },
  },
}
