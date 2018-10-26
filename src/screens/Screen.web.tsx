import * as React from 'react'
import { MessageDescriptor, intl } from 'src/intl'

export type ScreenProps = {}

export type TitleFcn<T> = (params: T) => string | MessageDescriptor

export interface AddButtonProps {
  setAdd: (callback: () => any) => any
}

export interface SaveButtonProps {
  setSave: (callback: () => any) => any
}

export interface EditButtonProps {
  setEdit: (callback: () => any) => any
}

interface Params<T> {
  title: TitleFcn<T>,
  addButton?: boolean
  saveButton?: boolean
  cancelButton?: boolean
  editButton?: boolean
}

export type ScreenComponent<T = {}, P = any> = React.ComponentType<P>

export const makeScreen = <T extends {}>(params: Params<T>) => {
  let onAdd = () => { console.warn('no add function') }
  let onSave = () => { console.warn('no save function') }
  let onEdit = () => { console.warn('no edit function') }
  const moreProps = {
    setAdd: params.addButton ? ((addfcn: () => any) => { onAdd = addfcn }) : null,
    setSave: params.saveButton ? ((saveFcn: () => any) => { onSave = saveFcn }) : null,
    setEdit: params.editButton ? ((editFcn: () => any) => { onEdit = editFcn }) : null,
  }

  return <P extends object>(Component: React.ComponentType<P>) => {
    const nav: ScreenComponent<T, P> = ((props) => (
      <Component
        {...props}
        {...moreProps}
      />
    ))

    nav.displayName = `Screen(${Component.displayName || Component.name})`
    return nav
  }
}
