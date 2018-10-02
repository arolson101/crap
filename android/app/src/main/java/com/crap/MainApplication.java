package com.crap;

import android.app.Application;

import org.pgsqlite.SQLitePluginPackage;
import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SQLitePluginPackage(),
            new BlurViewPackage(),
            new PickerPackage(),
            new ImageResizerPackage(),
            new VectorIconsPackage(),
            new RandomBytesPackage(),
            new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
