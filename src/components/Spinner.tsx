import { Button, Spinner as NBSpinner, View, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Dimensions, Modal, StyleSheet } from 'react-native'
import { intl, defineMessages } from 'src/intl'

interface Props {
  visible: boolean
  cancelable?: boolean
  onCancel: () => any
}

export const Spinner: React.SFC<Props> = props => {
  const { visible, cancelable, onCancel } = props
  const { height, width } = Dimensions.get('window')

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={[styles.modalBackground, { height, width }]}>
        <View style={styles.activityIndicatorWrapper}>
          <NBSpinner color={platform.brandInfo} />
          {cancelable &&
            <Button block transparent info onPress={onCancel}>
              <Text>{intl.formatMessage(messages.cancel)}</Text>
            </Button>
          }
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000080'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column'
  }
})

const messages = defineMessages({
  cancel: {
    id: 'Spinner.cancel',
    defaultMessage: 'Cancel'
  }
})
