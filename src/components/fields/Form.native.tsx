import { Formik, FormikProps, FormikConfig } from 'formik'
import * as React from 'react'
import * as NB from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'

export namespace Form {
  export interface Props<Values> extends FormikConfig<Values> {
    getApi?: (api: FormikProps<Values>) => any
    children: (props: FormikProps<Values>) => React.ReactNode
  }
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
          onSubmit={(values, formikActions) => {
            const { onSubmit } = this.props
            this.closeToast()
            if (onSubmit) {
              onSubmit(values, formikActions)
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
    (NB.Toast as any).toastInstance._root.closeToast()
  }
}
