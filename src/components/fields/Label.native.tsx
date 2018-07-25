import { Label as NBLabel } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { LabelProps } from './Label'

export const Label: React.SFC<LabelProps> = ({ label, error }) => (
  <FormattedMessage {...label}>
    {txt =>
      <NBLabel
        style={{ color: error ? platform.inputErrorBorderColor : platform.listNoteColor }}
      >
        {txt}
      </NBLabel>
    }
  </FormattedMessage>
)
