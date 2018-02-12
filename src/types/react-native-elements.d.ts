import { IconObject } from 'react-native-elements';
import {
  ViewStyle,
  TextStyle,
  Image,
  ImageProperties,
  ImageStyle,
  ImageURISource,
  TouchableWithoutFeedbackProps,
  TouchableHighlightProperties,
  TouchableOpacityProperties,
  ViewProperties,
  TextInputProperties,
  TextInput,
  TextProperties,
  StatusBarProperties,
  KeyboardType,
  KeyboardTypeIOS,
  StyleProp,
  GestureResponderEvent,
  Animated,
  TransformsStyle,
  ActivityIndicatorProperties,
} from 'react-native';

declare module 'react-native-elements' {
  export interface InputProps {
    containerStyle?: StyleProp<ViewStyle>;
    placeholder?: string;
    leftIcon?: IconObject | JSX.Element;
    leftIconContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    shake?: any;
    displayError?: boolean;
    errorStyle?: StyleProp<TextStyle>;
    errorMessage?: string;
  }
  export class Input extends React.Component<InputProps, any> {}
}
