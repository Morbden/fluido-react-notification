import { Snackbar } from '@fluido/react-components'
import { SnackbarStateProps } from '@fluido/react-components/dist/snackbar'
import { useMediaQuery } from '@fluido/react-utils'
import { createState, useState } from '@hookstate/core'
import cx from 'classnames'
import { uid } from 'uid'
import { StyledSnackbarManager } from './styled'

export interface SnackbarManagerStateProps {
  id?: string
  snack: SnackbarStateProps
}

export interface SnackbarManagerProps {
  breakpoint?: number
}

const SnackbarState = createState<SnackbarManagerStateProps[]>([])

export const useSnackbar = () => (snack: SnackbarStateProps) => {
  SnackbarState.merge([
    {
      id: uid(6),
      snack: {
        ...snack,
        duration: Math.floor((snack.duration || 3) * 1000),
      },
    },
  ])
}

const SnackbarManager: React.FunctionComponent<SnackbarManagerProps> = ({
  breakpoint = 560,
}) => {
  const snackbar = useState<SnackbarManagerStateProps[]>(SnackbarState)
  const sm = useMediaQuery(`(min-width: ${breakpoint}px)`)

  return (
    <StyledSnackbarManager className={cx({ sm })}>
      {snackbar.map(({ id, snack }) => {
        const vid = id.value.toString()
        return (
          <Snackbar
            key={vid}
            snack={snack as any}
            onClose={() => {
              snackbar.set((ol) => {
                const i = ol.findIndex((e) => e.id === vid)
                ol.splice(i, 1)
                return [].concat(ol)
              })
            }}
          />
        )
      })}
    </StyledSnackbarManager>
  )
}

export default SnackbarManager
