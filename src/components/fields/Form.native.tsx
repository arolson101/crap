import { Formik, FormikActions } from 'formik'
import * as NB from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { FormProps } from './Form'

export namespace Form {
  export type Props<Values> = FormProps<Values>
}

export class Form<Values> extends React.Component<Form.Props<Values>> {
  componentWillUnmount() {
    this.closeToast()
  }

  render() {
    const { children, ...props } = this.props
    return (
      <NB.Form style={{ backgroundColor: platform.cardDefaultBg }}>
        <Formik
          {...props}
          validateOnSubmit
          onSubmit={async (values: Values, formikActions: FormikActions<Values>) => {
            const { onSubmit } = this.props
            this.closeToast()
            try {
              if (onSubmit) {
                onSubmit(values, formikActions)
              }
            } catch (err) {
              console.log('submit form error', err)
              NB.Toast.show({
                text: err.message,
                buttonText: 'Okay',
                duration: 0,
                type: 'danger',
                onClose: () => {
                  // this.formApi.setFieldError(field, null)
                }
              })
            }
          }}
          // onSubmitFailure={(errors) => {
          //   console.log(errors)
          //   Object.keys(errors).forEach(field => {
          //     NB.Toast.show({
          //       text: errors[field] as string,
          //       buttonText: 'Okay',
          //       duration: 0,
          //       type: 'danger',
          //       onClose: () => {
          //         this.formApi.setFieldError(field, null)
          //       }
          //     })
          //   })
          // }}
        >
          {formApi => {
            if (this.props.getApi) {
              this.props.getApi(formApi)
            }

            return children && children(formApi)
          }}
        </Formik>
      </NB.Form>
    )
  }

  closeToast = () => {
    // console.log('closetoast 2');
    // (NB.Toast as any).toastInstance._root.closeToast()
  }
}
