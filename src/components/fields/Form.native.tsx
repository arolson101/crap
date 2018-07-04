import * as React from 'react'
import * as RF from 'react-form'
import * as NB from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'

type Props = RF.FormProps

export class Form extends React.Component<Props> {
  formApi: RF.FormAPI

  render () {
    return (
      <NB.Form style={{ backgroundColor: platform.cardDefaultBg }}>
        <RF.Form
          {...this.props}
          validateOnSubmit
          onSubmitFailure={(errors) => {
            console.log(errors)
            Object.keys(errors).forEach(field => {
              NB.Toast.show({
                text: errors[field] as string,
                buttonText: 'Okay',
                duration: 0,
                type: 'danger',
                onClose: () => {
                  this.formApi.setError(field, null)
                }
              })
            })
          }}
          getApi={(formApi) => {
            this.formApi = formApi
            if (this.props.getApi) {
              this.props.getApi(formApi)
            }
          }}
        />
      </NB.Form>
    )
  }
}
