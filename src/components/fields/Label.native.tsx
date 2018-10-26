import { Label as NBLabel } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { LabelProps } from './Label'
import { intl } from 'src/intl'

export const Label: React.SFC<LabelProps> = ({ label, error }) => (
  <NBLabel
    style={{ color: error ? platform.inputErrorBorderColor : platform.listNoteColor }}
  >
    {intl.formatMessage(label)}
  </NBLabel>
)
