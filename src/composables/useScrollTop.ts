import BTween from 'b-tween'

// https://github.com/PengJiyuan/b-tween
export function useScrollTop(target: HTMLElement, easing = 'quartOut', duration = 500) {
  if (!target)
    return

  const { scrollTop } = target
  const tween = new BTween({
    from: { scrollTop },
    to: { scrollTop: 0 },
    easing,
    duration,
    onUpdate: (keys: any) => {
      if (target)
        target.scrollTop = keys.scrollTop
    },
  })
  tween.start()
}

