import { MaterialIcons } from '@expo/vector-icons';
import { AppLoading, Asset, Font, RequireSource } from 'expo';
import * as React from 'react';
import { Image } from 'react-native';

// https://docs.expo.io/versions/latest/guides/preloading-and-caching-assets.html

const cacheImages = (images: (string | RequireSource)[]) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

const cacheFonts = (fonts: Font.FontMap[]) => {
  return fonts.map(font => Font.loadAsync(font))
}

interface State {
  isReady: boolean
}

export class LoadFonts extends React.Component<{}, State> {
  state: State = {
    isReady: false
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([])
    const fontAssets = cacheFonts([(MaterialIcons as any).font])

    await Promise.all([...imageAssets, ...fontAssets])
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    // tslint:disable-next-line
    return <>{this.props.children}</>;
  }
}
