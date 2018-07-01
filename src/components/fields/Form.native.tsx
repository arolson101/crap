import * as React from 'react'
import * as RF from 'react-form'
import * as NB from 'native-base'

type Props = RF.FormProps

export const Form: React.SFC<Props> = (props) => {
  return (
    <NB.Form>
      <RF.Form
        {...props}
        validateOnSubmit
        onSubmitFailure={(errors) => {
          console.log(errors)
          for (let field in errors) {
            NB.Toast.show({
              text: errors[field] as string,
              buttonText: 'Okay',
              duration: 0,
            })
          }
        }}
      />
    </NB.Form>
  )
}
